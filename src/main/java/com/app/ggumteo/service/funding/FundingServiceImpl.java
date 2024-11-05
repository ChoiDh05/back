package com.app.ggumteo.service.funding;

import com.app.ggumteo.domain.file.FileVO;
import com.app.ggumteo.domain.funding.FundingDTO;
import com.app.ggumteo.domain.funding.FundingProductVO;
import com.app.ggumteo.domain.post.PostVO;
import com.app.ggumteo.repository.funding.FundingDAO;
import com.app.ggumteo.repository.post.PostDAO;
import com.app.ggumteo.repository.work.WorkDAO;
import com.app.ggumteo.service.file.PostFileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
@Primary
@Slf4j
public class FundingServiceImpl implements FundingService{


    private final FundingDAO fundingDAO;
    private final PostDAO postDAO;
    private final PostFileService postFileService;  // 파일 저장 서비스 주입

    @Override
    public void write(FundingDTO fundingDTO, MultipartFile[] fundingFiles, MultipartFile thumbnailFile) {
        // Post 테이블에 저장할 데이터 설정
        PostVO postVO = new PostVO();
        postVO.setPostTitle(fundingDTO.getPostTitle());
        postVO.setPostContent(fundingDTO.getPostContent());
        postVO.setPostType(fundingDTO.getPostType());
        postVO.setMemberProfileId(fundingDTO.getMemberProfileId());

        // post 데이터 저장
        postDAO.save(postVO);
        Long postId = postVO.getId();

        // Funding 테이블에 저장할 데이터 설정
        fundingDTO.setId(postId);
        fundingDAO.save(fundingDTO);

        // 펀딩 상품 삽입 처리
        List<FundingProductVO> fundingProducts = fundingDTO.getFundingProducts();
        if (fundingProducts != null && !fundingProducts.isEmpty()) {
            for (FundingProductVO product : fundingProducts) {
                product.setFundingId(postId); // 펀딩 ID 설정
                fundingDAO.saveFundingProduct(product);
            }
        }

        // 파일 저장 처리 (펀딩 파일)
        if (fundingFiles != null && fundingFiles.length > 0) {
            for (MultipartFile file : fundingFiles) {
                if (!file.isEmpty()) {
                    postFileService.saveFile(file, fundingDTO.getId());
                }
            }
        }

        // 썸네일 파일 처리
        if (thumbnailFile != null && !thumbnailFile.isEmpty()) {
            FileVO thumbnailFileVO = postFileService.saveFile(thumbnailFile, fundingDTO.getId());
            fundingDTO.setThumbnailFileId(thumbnailFileVO.getId()); // FileVO의 ID를 사용하여 설정
            fundingDAO.updateFunding(fundingDTO); // 썸네일 ID 업데이트
        }
    }
}
