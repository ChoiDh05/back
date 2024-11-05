package com.app.ggumteo.repository.funding;

import com.app.ggumteo.domain.funding.BuyFundingProductDTO;
import com.app.ggumteo.domain.funding.FundingDTO;
import com.app.ggumteo.domain.funding.FundingProductVO;
import com.app.ggumteo.domain.work.WorkDTO;
import com.app.ggumteo.mapper.funding.BuyFundingProductMapper;
import com.app.ggumteo.mapper.funding.FundingMapper;
import com.app.ggumteo.pagination.MyPagePagination;
import com.app.ggumteo.pagination.Pagination;
import com.app.ggumteo.pagination.SettingTablePagination;
import com.app.ggumteo.pagination.WorkAndFundingPagination;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class FundingDAO {
    private final FundingMapper fundingMapper;

//    내 펀딩 게시물 전체 조회
    public List<FundingDTO> findByMemberId(WorkAndFundingPagination workAndFundingPagination, Long memberId, String postType) {
        return fundingMapper.selectByMemberId(workAndFundingPagination, memberId, postType);
    }

//    내 펀딩 게시물 전체 개수
    public int getTotal(Long memberId, String postType){
        return fundingMapper.selectCount(memberId, postType);
    }

//    펀딩 정보 조회
    public Optional<FundingDTO> findById(Long id, String postType) {
        return fundingMapper.selectById(id, postType);
    }

    // 펀딩 삽입 메서드
    public void save(FundingDTO fundingDTO) {
        fundingMapper.insert(fundingDTO);
    }

    // 펀딩 상품 삽입 메서드
    public void saveFundingProduct(FundingProductVO fundingProductVO) {
        fundingMapper.saveFundingProduct(fundingProductVO);
    }

    // 펀딩 정보 수정
    public void updateFunding(FundingDTO fundingDTO) {
        fundingMapper.updateFunding(fundingDTO);
    }


}
