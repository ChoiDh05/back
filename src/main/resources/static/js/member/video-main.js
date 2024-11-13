document.addEventListener("DOMContentLoaded", function () {
    // 첫 번째 기능: 사이드바 접기/펼치기
    const sidebarToggle = document.querySelector("#mypage-fold");
    const mypageListBox = document.querySelector("#mypage-list");
    const iconFold = document.querySelector(".icon-fold");

    if (sidebarToggle && mypageListBox && iconFold) {
        sidebarToggle.addEventListener("click", function () {
            // `hidden` 클래스를 토글하여 접기/펼치기 구현
            mypageListBox.classList.toggle("hidden");

            // 아이콘 방향 변경
            iconFold.classList.toggle(" fold-on");
        });
    }
    // 페이지가 처음 로드될 때 기본 콘텐츠 표시 (my-main)
    const defaultContent = document.getElementById("my-main");
    if (defaultContent) {
        defaultContent.classList.add("active");
    }

    // 사이드바 메뉴 클릭 이벤트 설정 (내 활동내역 이외의 메뉴들)
    document
        .querySelectorAll(".sidebar-menu.mypage, .highlight-memo, .read-news")
        .forEach((menu) => {
            menu.addEventListener("click", function () {
                if (this.id === "mypage-fold") {
                    // "나의 활동내역"을 클릭했을 때 현재 콘텐츠 유지
                    return;
                }

                // 모든 콘텐츠에서 active 클래스 제거 (콘텐츠 숨기기)
                document
                    .querySelectorAll(".main-content-container .content")
                    .forEach((content) => {
                        content.classList.remove("active");
                    });

                // 선택한 콘텐츠만 active 클래스 추가 (콘텐츠 표시)
                const contentId = this.getAttribute("name") + "-content";
                const selectedContent = document.getElementById(contentId);
                if (selectedContent) {
                    selectedContent.classList.add("active");
                    globalThis.myWorkPage = 1;
                    myPageService.getMyVideoWorkList(globalThis.myWorkPage, memberId, showMyWorkList);

                    globalThis.myBuyWorkPage = 1
                    myPageService.getMyBuyVideoWorkList(globalThis.myBuyWorkPage, memberId, showMyBuyWorkList);

                    globalThis.myFundingPage = 1;
                    myPageService.getMyFundingList(globalThis.myFundingPage, memberId, showMyFundingList);

                    globalThis.myBuyFundingPage = 1;
                    myPageService.getMyBuyFundingList(globalThis.myBuyFundingPage, memberId, showMyBuyFundingList);

                    globalThis.myAuditionPage = 1;
                    myPageService.getMyVideoAuditionList(globalThis.myAuditionPage, memberId, showMyAuditionList);


                    globalThis.myApplicationAuditionPage = 1;
                    myPageService.getMyVideoApplicationAuditionList(globalThis.myApplicationAuditionPage, memberId, showMyApplicationAuditionList);

                    globalThis.myInquiryHistoryPage = 1;
                    myPageService.getMyInquiryHistoryList(globalThis.myInquiryHistoryPage, memberId, showMyInquiryHistoryList);
                }

                // 모든 사이드바 메뉴에서 active-menu 클래스 제거
                document.querySelectorAll(".sidebar-menu").forEach((item) => {
                    item.classList.remove("active-menu");
                });

                // 클릭된 메뉴에 active-menu 클래스 추가
                this.classList.add("active-menu");

                // "나의 활동내역" 아이콘 상태 업데이트 (접힌 상태일 때 아이콘이 올바르게 표시되도록)
                if (mypageListBox.style.display === "none") {
                    iconFold.classList.add("fold-on");
                } else {
                    iconFold.classList.remove("fold-on");
                }
            });
        });

    // 두 번째 기능: 공개/비공개 선택 버튼 클릭 이벤트 설정
    // const choiceGroups = document.querySelectorAll(".btn-group.choice-group");
    //
    // choiceGroups.forEach(function (group) {
    //     const btnPublic = group.querySelector(".btn-choice.btn-public");
    //     const btnSecret = group.querySelector(".btn-choice.btn-secret");
    //
    //     // 클릭 이벤트 설정
    //     function toggleActiveClass(event) {
    //         // 두 버튼에 active 클래스를 교환
    //         btnPublic.classList.toggle("active");
    //         btnSecret.classList.toggle("active");
    //     }
    //
    //     // 각 버튼에 이벤트 리스너 추가
    //     btnPublic.addEventListener("click", toggleActiveClass);
    //     btnSecret.addEventListener("click", toggleActiveClass);
    // });

    // 세 번째 기능: "구매한 사람들" 버튼 클릭 시 설정 테이블 표시/숨김

    const toggleButtons = document.querySelectorAll(
        '.icon-my-edit-off'
    );


    // 모든 setting-table을 숨깁니다.

    const settingTables = document.querySelectorAll(".setting-table");
    settingTables.forEach(function (table) {
        table.style.display = "none"; // 처음엔 숨김
    });


    // 버튼 클릭 시 설정 테이블을 표시/숨김 처리하는 이벤트 리스너

    toggleButtons.forEach(function (button, index) {
        button.addEventListener("click", function () {
            const settingTable = settingTables[index];
            if (
                settingTable.style.display === "none" ||
                settingTable.style.display === ""
            ) {
                settingTable.style.display = "block"; // 보여줍니다.
            } else {
                settingTable.style.display = "none"; // 숨깁니다.
            }
        });
    });

    // 네 번째 기능: 나의 모집에서 답글 섹션 표시/숨김
    const toggleReplyBtns = document.querySelectorAll(".btn-wrapper");

    toggleReplyBtns.forEach(function (btnWrapper) {
        const toggleBtn = btnWrapper.querySelector(".btn-icon-edit-my"); // .btn-icon-edit-my 버튼만 선택
        if (toggleBtn) {
            toggleBtn.addEventListener("click", function () {
                const replyId = btnWrapper.getAttribute("data-reply"); // 각 버튼에 설정된 data-reply 값 가져오기
                const replySection = document.getElementById(
                    `replySection${replyId}`
                ); // data-reply에 해당하는 replySection 찾기
                if (
                    replySection.style.display === "none" ||
                    replySection.style.display === ""
                ) {
                    replySection.style.display = "block"; // 보이도록 변경
                } else {
                    replySection.style.display = "none"; // 다시 숨김
                }
            });
        }
    });

    // 추가 기능: 사이드바 메뉴 접기/펼치기 기능
    const sidebarMenu = document.querySelector(".sidebar-menu.mypage");
    if (sidebarMenu && mypageListBox && iconFold) {
        sidebarMenu.addEventListener("click", function () {
            if (
                mypageListBox.style.display === "none" ||
                mypageListBox.style.display === ""
            ) {
                mypageListBox.style.display = "block";
            } else {
                mypageListBox.style.display = "none";
            }
            iconFold.classList.toggle("fold-on");
        });
    }

    // 각 입력 필드의 유효성 검사를 위한 정규식 패턴 정의
    const validationPatterns = {
        name: /^[가-힣]{2,4}$/, // 한글 2~4자만 허용 예) 홍길동
        age: /^[0-9]{1,2}$/, // 숫자만 1~2자 허용 예) 21
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // 일반 이메일 형식 예) ggumteo@naver.com
        phonenumber: /^010\d{7,8}$/, // 010으로 시작하고 숫자가 10~11자 예) 01099999999
    };

    // 모든 필수 입력 필드 선택
    const inputFields = document.querySelectorAll(".required");

    // 입력 필드 변화 시 유효성 검사 적용
    inputFields.forEach(function (input) {
        input.addEventListener("input", function () {
            validateInput(input);
        });
    });

    // 유효성 검사 함수
    function validateInput(input) {
        const fieldId = input.id;
        const pattern = validationPatterns[fieldId];

        // 각 필드의 id에 해당하는 패턴이 있을 때만 검사
        if (pattern) {
            if (!pattern.test(input.value.trim())) {
                input.classList.remove("input-valid");
                input.classList.add("input-invalid");
            } else {
                input.classList.remove("input-invalid");
                input.classList.add("input-valid");
            }
        } else {
            // 추가사항 작성은 비어 있어도 valid 처리
            if (fieldId === "addwrite") {
                if (input.value.trim() === "") {
                    input.classList.remove("input-valid");
                    input.classList.remove("input-invalid");
                } else {
                    input.classList.remove("input-invalid");
                    input.classList.add("input-valid");
                }
            }
        }
    }

    // 폼 제출 시 모든 필수 항목이 유효한지 확인
    const submitButton = document.querySelector(".btn-submit");
    if (submitButton) {
        submitButton.addEventListener("click", function (event) {
            let isValid = true;

            // 제출 시 모든 필드 재검사
            inputFields.forEach(function (input) {
                validateInput(input);

                // 유효성 검사를 통과하지 못하면 isValid를 false로 설정
                if (
                    input.classList.contains("input-invalid") ||
                    !input.classList.contains("input-valid")
                ) {
                    isValid = false;
                }
            });

            // 유효하지 않은 경우 경고 메시지 표시 및 제출 막기
            if (!isValid) {
                event.preventDefault();
                alert("예시 형식에 맞게 필수 항목을 모두 작성해 주세요.");
            } else {
                alert("성공적으로 제출되었습니다.");
            }
        });
    }

    // textarea 크기 조절 함수
    function resizeTextarea(textarea) {
        textarea.style.height = "auto"; // 높이를 초기화하여 스크롤이 생기지 않게 함
        textarea.style.height = textarea.scrollHeight + 70 + "px"; // 내용을 포함할 만큼 높이 조절
    }

    // 페이지 로딩 후 초기화
    // const textarea = document.querySelector("textarea[name='description']");
    // if (textarea) {
    //     resizeTextarea(textarea);
    // }
    // var check = $("input[type='checkbox']");
    // check.click(function () {
    //     $("p").toggle();
    // });
});
// 추가 기능: "내 작품" 등 클릭 시 사이드바 메뉴와 동일한 효과
document.querySelectorAll(".btn.last-open-mypage").forEach((button) => {
    button.addEventListener("click", function () {
        const mypageTitle = this.querySelector(".mypage-title").innerText;
        let targetSidebarMenu;

        switch (mypageTitle) {
            case "내 작품":
                targetSidebarMenu = document.querySelector(
                    ".sidebar-menu[name='my-product']"
                );
                break;
            case "내가 구매한 작품":
                targetSidebarMenu = document.querySelector(
                    ".sidebar-menu[name='my-buy-product']"
                );
                break;
            case "나의 펀딩":
                targetSidebarMenu = document.querySelector(
                    ".sidebar-menu[name='my-funding']"
                );
                break;
            case "결제한 펀딩":
                targetSidebarMenu = document.querySelector(
                    ".sidebar-menu[name='my-buy-funding']"
                );
                break;
            case "나의 모집":
                targetSidebarMenu = document.querySelector(
                    ".sidebar-menu[name='my-audition']"
                );
                break;
            case "내가 신청한 모집":
                targetSidebarMenu = document.querySelector(
                    ".sidebar-menu[name='my-apply-audition']"
                );
                break;
            case "내가 단 리뷰":
                targetSidebarMenu = document.querySelector(
                    ".sidebar-menu[name='my-review']"
                );
                break;
            default:
                return;
        }

        if (targetSidebarMenu) {
            targetSidebarMenu.click();
        }
    });
});

// 추가 : 회원 탈퇴하기 버튼 클릭 시 기능 구현
const withdrawBtn = document.getElementById("withdraw-btn");
const withdrawModal = document.querySelector(".withdraw-modal");
const closeBtn = document.querySelector(".close-btn");

withdrawBtn.addEventListener("click", () => {
    withdrawModal.style.display = "flex"
})

closeBtn.addEventListener("click", () => {
    withdrawModal.style.display = "none"
})

// // 추가 : 내 정보
// document.addEventListener("DOMContentLoaded", function () {
//     const formControls = document.querySelectorAll(".form-control");
//
//     formControls.forEach((control) => {
//         let hasBeenFocused = false;
//
//         control.addEventListener("focus", () => {
//             control.classList.add("active");
//             hasBeenFocused = true;
//         });
//
//         control.addEventListener("blur", () => {
//             const errorMessage = control.closest(".input-gap")
//                 ? control.closest(".input-gap").parentElement.querySelector(".error-message")
//                 : control.parentElement.querySelector(".error-message");
//
//             if (control.value.trim() === "" && !control.matches("textarea")) {
//                 control.classList.add("error");
//                 if (errorMessage) {
//                     errorMessage.style.display = "block";
//                 }
//             } else {
//                 control.classList.remove("error");
//                 if (errorMessage) {
//                     errorMessage.style.display = "none";
//                 }
//             }
//         });
//     });
//
//     // 유효성 검사 함수 (이메일, 전화번호 전용 - 인증번호는 제외)
//     function validateField(input, regex, errorMessageText) {
//         const errorMessage = input.closest(".input-gap")
//             ? input.closest(".input-gap").parentElement.querySelector(".error-message")
//             : input.parentElement.querySelector(".error-message");
//
//         if (!regex.test(input.value.trim())) {
//             input.classList.add("error");
//             if (errorMessage) {
//                 errorMessage.textContent = errorMessageText;
//                 errorMessage.style.display = "block";
//             }
//             return false;
//         } else {
//             input.classList.remove("error");
//             if (errorMessage) {
//                 errorMessage.style.display = "none";
//             }
//             return true;
//         }
//     }
//
//     // 전화번호 포맷 자동 추가
//     const phoneField = document.querySelector("input[name='profilePhone']");
//     phoneField.addEventListener("input", (event) => {
//         let value = event.target.value.replace(/[^0-9]/g, "");
//         if (value.length > 3 && value.length <= 7) {
//             value = value.slice(0, 3) + "-" + value.slice(3);
//         } else if (value.length > 7) {
//             value = value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7);
//         }
//         event.target.value = value;
//     });
//
//     // 이메일 인증번호 요청 버튼 클릭 시 유효성 검사 및 `.certification-input` 클래스 제거
//     document.getElementById("requestEmailCode").addEventListener("click", function () {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         const emailField = document.querySelector("input[name='profileEmail']");
//
//         if (validateField(emailField, emailRegex, "올바른 이메일 주소를 입력해주세요.")) {
//             const emailCertificationInput = document.getElementById("emailVerificationCode").closest(".certification-input");
//             if (emailCertificationInput) {
//                 emailCertificationInput.classList.remove("certification-input");
//             }
//         }
//     });
//
//     // 전화번호 인증번호 요청 버튼 클릭 시 유효성 검사 및 `.certification-input` 클래스 제거
//     document.getElementById("requestVerificationCode").addEventListener("click", function () {
//         const phoneRegex = /^(010|011|016|017|018|019)-\d{3,4}-\d{4}$/;
//
//         if (validateField(phoneField, phoneRegex, "올바른 전화번호를 입력해주세요.")) {
//             const phoneCertificationInput = document.getElementById("verificationCode").closest(".certification-input");
//             if (phoneCertificationInput) {
//                 phoneCertificationInput.classList.remove("certification-input");
//             }
//         }
//     });
//
//     // 전체 폼 유효성 검사 및 제출 함수
//     function validateAndSubmitForm() {
//         let isValid = true;
//
//         // 이메일 필드 유효성 검사
//         const emailField = document.querySelector("input[name='profileEmail']");
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!validateField(emailField, emailRegex, "올바른 이메일 주소를 입력해주세요.")) {
//             isValid = false;
//         }
//
//         // 전화번호 필드 유효성 검사
//         const phoneField = document.querySelector("input[name='profilePhone']");
//         const phoneRegex = /^(010|011|016|017|018|019)-\d{3,4}-\d{4}$/;
//         if (!validateField(phoneField, phoneRegex, "올바른 전화번호를 입력해주세요.")) {
//             isValid = false;
//         }
//
//         // 기타 필드 유효성 검사 (인증번호 필드는 제외)
//         document.querySelectorAll(".form-control:not(#emailVerificationCode):not(#verificationCode)").forEach(function (input) {
//             const errorMessage = input.closest(".input-gap")
//                 ? input.closest(".input-gap").parentElement.querySelector(".error-message")
//                 : input.parentElement.querySelector(".error-message");
//
//             if (!input.value.trim() && !input.matches(".temp-upload-resume") && !input.matches("textarea")) {
//                 input.classList.add("error");
//                 if (errorMessage) {
//                     errorMessage.style.display = "block";
//                 }
//                 isValid = false;
//             } else {
//                 input.classList.remove("error");
//                 if (errorMessage) {
//                     errorMessage.style.display = "none";
//                 }
//             }
//         });
//
//         // 폼 제출 처리
//         if (isValid) {
//             document.getElementById("base-edit-form").submit();
//         } else {
//             console.log("Form validation failed. Please fill in all required fields.");
//         }
//     }
//
//     document.getElementById("consulting_apply_button").addEventListener("click", function (event) {
//         event.preventDefault();
//         validateAndSubmitForm();
//     });
// });
//
