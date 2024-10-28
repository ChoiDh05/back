package com.app.ggumteo.controller.audition;

import com.app.ggumteo.constant.PostType;
import com.app.ggumteo.domain.audition.AuditionDTO;
import com.app.ggumteo.domain.member.MemberVO;
import com.app.ggumteo.service.audition.AuditionService;
import com.app.ggumteo.service.file.PostFileService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;

@Controller
@Slf4j
@RequestMapping("/audition/video/*")
@RequiredArgsConstructor
public class VideoAuditionController {
    private final AuditionService auditionService;
    private final HttpSession session;
    private final PostFileService postFileService;

    @ModelAttribute
    public void setTestMember(HttpSession session) {
        if (session.getAttribute("member") == null) {
            session.setAttribute("member", new MemberVO(
                    1L,

                    "",         // memberEmail
                    "",
                    "",              // profileUrl
                    "",          // createdDate
                    ""          // updatedDate
            ));
        }
    }

//    write 화면으로 이동
    @GetMapping("audition-write")
    public void goToWritePage() {

        log.info("세션에 설정된 memberId:" + ((MemberVO) session.getAttribute("member")).getId());
    }

    @PostMapping("audition-write")
    public ResponseEntity<?> write(AuditionDTO auditionDTO, @RequestParam("auditionFile") MultipartFile[] auditionFiles) {

        try {
            // 세션에서 멤버 정보 가져오기
            MemberVO member = (MemberVO) session.getAttribute("member");
            if (member == null) {
                log.error("멤버 정보가 세션에 없습니다.");
                return ResponseEntity.status(400).body(Collections.singletonMap("error","세션에 정보가 없습니다."));
            }

//          PostType을 VIDEO로 고정
            auditionDTO.setPostType(PostType.VIDEO.name());
            auditionDTO.setAuditionStatus("모집중");
            auditionDTO.setMemberId(member.getId());

//          audition과 Post저장
            auditionService.write(auditionDTO);

//          파일 저장 로직 호출 (auditionFile 저장)
            if(auditionFiles != null && auditionFiles.length > 0) {
                for (MultipartFile file : auditionFiles) {
                    if (!file.isEmpty()) {
                        postFileService.saveFile(file,auditionDTO.getId());
                    }
                }
            }

//          파일 저장 처리

            return ResponseEntity.ok(Collections.singletonMap("success", true));
        } catch (Exception e) {
            log.error("오류 발생",e);
            return ResponseEntity.status(500).body(Collections.singletonMap("error", "저장 중 오류가 발생했습니다."));
        }
    }
}
