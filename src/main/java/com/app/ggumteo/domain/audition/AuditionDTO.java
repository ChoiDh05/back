package com.app.ggumteo.domain.audition;

import com.app.ggumteo.domain.file.PostFileDTO;
import com.app.ggumteo.domain.post.PostVO;
import lombok.*;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class AuditionDTO {
    private Long id;
    private Long postId;
    private String postTitle;
    private String postContent;
    private String postType;
    private String profileName;
    private String profileNickName;
    private String profileEmail;
    private String profileImgUrl;
    private Long memberProfileId;
    private Long memberId;
    private int auditionField;
    private String auditionCareer;
    private String expectedAmount;
    private String serviceStartDate;
    private String auditionDeadLine;
    private String auditionPersonnel;
    private String auditionLocation;
    private String auditionBackground;
    private String auditionCategory;
    private String fileContent;
    private String auditionStatus;
    private List<PostFileDTO> uploadedFiles;
    private List<MultipartFile> files;
    private MultipartFile auditionFile;
    private List<String> fileNames;
    private String filePath;
    private String createdDate;
    private String updatedDate;
    private List<Long> ids;

    public AuditionVO toVO() {
        return new AuditionVO(id, auditionField, auditionCareer, expectedAmount, serviceStartDate,
                auditionDeadLine, auditionPersonnel, auditionLocation, auditionBackground,
                auditionCategory, fileContent, auditionStatus);
    }

    public PostVO toPostVO() {
        return new PostVO(id, postTitle, postContent, postType, memberProfileId, createdDate,updatedDate);
    }
}
