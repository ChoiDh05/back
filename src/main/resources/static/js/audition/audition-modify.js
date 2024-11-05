document.addEventListener("DOMContentLoaded", function () {
    const writeForm = document.getElementById("write-form");
    const deletedFileIds = [];

    // 폼 제출 시 삭제할 파일 정보 포함
    writeForm.addEventListener("submit", function () {
        if (deletedFileIds.length > 0) {
            const hiddenInput = document.createElement("input");
            hiddenInput.setAttribute("type", "hidden");
            hiddenInput.setAttribute("name", "deletedFileIds");
            hiddenInput.setAttribute("value", deletedFileIds.join(","));
            writeForm.appendChild(hiddenInput);
        }
    });

    // 모든 input 요소에 대한 blur 이벤트 추가
    const inputElements = document.querySelectorAll("input");
    inputElements.forEach((input) => {
        input.addEventListener("blur", function () {
            if (input.value.trim() === "") {
                input.classList.add("error");
                input.style.border = "solid 1px #e52929";
                input.style.position = "relative";
                input.style.zIndex = "2";
            }
        });

        input.addEventListener("input", function () {
            if (
                input.classList.contains("error") &&
                input.value.trim() !== ""
            ) {
                input.classList.remove("error");
                input.style.border = ""; // 원래 상태로 복구
                input.style.position = "";
                input.style.zIndex = "";
            }
        });
    });

    // 특정 input 필드에 페이지 로드 시 label-effect 추가/제거
    const targetInputNames = ["postTitle", "auditionCareer", "expectedAmount"];
    targetInputNames.forEach((name) => {
        const inputElement = document.querySelector(`input[name="${name}"]`);
        if (inputElement) {
            const parentDiv = inputElement.closest("div");
            if (parentDiv) {
                // 페이지 로드 시 값이 있을 경우 label-effect 클래스 추가
                if (inputElement.value.trim() !== "") {
                    parentDiv.classList.add("label-effect");
                }

                // focus 및 blur 이벤트 추가
                inputElement.addEventListener("focus", function () {
                    parentDiv.classList.add("label-effect");
                });

                inputElement.addEventListener("blur", function () {
                    if (inputElement.value.trim() === "") {
                        parentDiv.classList.remove("label-effect");
                    }
                });
            }
        }
    });

    // 날짜 입력 처리 함수
    function formatDateInput(input) {
        input.addEventListener("input", function () {
            let value = input.value.replace(/[^0-9]/g, "");
            let formattedValue = "";
            if (value.length <= 4) {
                formattedValue = value;
            } else if (value.length > 4 && value.length <= 6) {
                let year = value.slice(0, 4);
                let month = value.slice(4, 6);
                if (parseInt(month) >= 0 && parseInt(month) <= 12) {
                    formattedValue = year + "." + month;
                } else {
                    formattedValue = year;
                }
            } else if (value.length > 6 && value.length <= 8) {
                let year = value.slice(0, 4);
                let month = value.slice(4, 6);
                let day = value.slice(6, 8);
                if (parseInt(month) >= 0 && parseInt(month) <= 31) {
                    formattedValue = year + "." + month + "." + day;
                } else {
                    formattedValue = year + "." + month;
                }
            }
            input.value = formattedValue;
        });

        input.addEventListener("keydown", function (e) {
            if (
                input.value.length >= 10 &&
                e.key !== "Backspace" &&
                e.key !== "Tab"
            ) {
                e.preventDefault();
            }
        });
    }

    // 모집인원 입력 처리 함수
    function formatParticipantInput(input) {
        input.addEventListener("input", function () {
            let value = input.value.replace(/[^0-9]/g, "");
            if (value) {
                input.value = value + "명";
            }
        });

        input.addEventListener("keydown", function (e) {
            if (input.value.endsWith("명") && e.key === "Backspace") {
                input.value = input.value.slice(0, -1);
            }
        });
    }

    // 날짜 입력 필드와 모집인원 입력 필드에 대한 처리
    const dateInputs = document.querySelectorAll('input[name="serviceStartDate"],input[name="auditionDeadLine"]');
    dateInputs.forEach(formatDateInput);
    const participantInput = document.querySelector('input[name="auditionPersonnel"]');
    if (participantInput) {
        formatParticipantInput(participantInput);
    }

    // 라디오 버튼 체크 및 배경색 효과
    const categoryBoxes = document.querySelectorAll(".project-category-box");
    categoryBoxes.forEach((box) => {
        box.addEventListener("click", () => {
            const radioInput = box.querySelector('input[type="radio"]');
            if (radioInput) {
                radioInput.checked = true;
            }
        });

        box.addEventListener("mouseenter", () => {
            box.style.backgroundColor = "#f7fafc";
        });

        box.addEventListener("mouseleave", () => {
            box.style.backgroundColor = "";
        });
    });

    // 기존 파일 삭제 버튼 클릭 시 삭제 처리
    document.querySelectorAll(".existing-file .btn-edit-item[data-file-id]").forEach(button => {
        button.addEventListener("click", function () {
            const fileId = this.getAttribute("data-file-id");
            deletedFileIds.push(fileId);
            console.log("삭제할 파일 ID 추가:", fileId);
            this.closest(".img-box-list").style.display = "none"; // UI에서 삭제 표시
        });
    });

    // HTML에 이미 존재하는 두 번째 <div class="audition-img-box"> 안의 img-box-list에 대해서도 파일 업로드 이벤트 리스너 설정
    document.querySelectorAll("#img-box-container .img-box-list").forEach(setupEventListeners);

    // 파일 추가 버튼 클릭 시 새로운 img-box-list 추가
    document.querySelector(".img-add").addEventListener("click", function () {
        const newFileContainer = document.getElementById("img-box-container");
        const timestamp = Date.now();

        const newImgBox = document.createElement("div");
        newImgBox.classList.add("img-box-list");
        newImgBox.innerHTML = `
            <div class="img-content-box">
                <div class="img-edit-box" style="margin-left: 510px; margin-top: 28px;">
                    <div class="btn-edit-item" id="btn-change-image-${timestamp}">
                        이미지 변경
                    </div>
                    <div class="btn-edit-item" id="btn-delete-image-${timestamp}">
                        이미지 삭제
                    </div>
                </div>
                <div class="center-text img-box">
                    <div class="default-img" id="default-img-${timestamp}">
                        <img id="preview-${timestamp}" src="https://www.wishket.com/static/renewal/img/partner/profile/icon_btn_add_portfolio_image.png" class="img-tag" />
                        <video id="video-preview-${timestamp}" class="video-tag" style="display: none;" controls></video>
                        <div class="img-box-title">작품 영상, 이미지 등록</div>
                        <div class="img-box-text">작품 결과물 혹은 설명을 돕는 이미지를 선택해 주세요.</div>
                        <div class="img-box-help"><span>· 이미지 최적 사이즈: 가로 720px</span></div>
                        <input id="file-upload-${timestamp}" name="auditionFile" type="file" accept="image/*,video/*" style="display: none;" />
                    </div>
                </div>
                <div class="img-caption-box" style="display: none;">
                </div>
            </div>
        `;

        newFileContainer.append(newImgBox);
        setupEventListeners(newImgBox); // 새로 추가된 img-box-list에도 이벤트 리스너 설정
    });

    // 파일 미리보기 함수 (파일 선택 시 이미지 및 비디오 미리보기)
    function previewFile(fileInput, previewSelector, videoPreviewSelector) {
        const file = fileInput.files[0];
        const preview = document.querySelector(previewSelector);
        const videoPreview = document.querySelector(videoPreviewSelector);
        const imgBox = preview.closest(".img-box-list");
        const title = imgBox.querySelector(".img-box-title");
        const text = imgBox.querySelector(".img-box-text");
        const help = imgBox.querySelector(".img-box-help");
        const imgCaptionBox = imgBox.querySelector(".img-caption-box");

        const reader = new FileReader();

        reader.addEventListener("load", function () {
            if (file) {
                if (file.type.startsWith("image/")) {
                    preview.src = reader.result;
                    preview.style.display = "block";
                    videoPreview.style.display = "none";
                    title.style.display = "none";
                    text.style.display = "none";
                    help.style.display = "none";
                    imgCaptionBox.style.display = "block";
                } else if (file.type.startsWith("video/")) {
                    videoPreview.src = reader.result;
                    videoPreview.style.display = "block";
                    videoPreview.style.width = "100%";
                    preview.style.display = "none";
                    title.style.display = "none";
                    text.style.display = "none";
                    help.style.display = "none";
                    imgCaptionBox.style.display = "block";
                }
            }
        });

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    // 파일 첨부 및 미리보기 이벤트 리스너 설정 함수
    function setupEventListeners(imgBox) {
        const defaultImg = imgBox.querySelector(".default-img");
        const fileUpload = imgBox.querySelector('input[type="file"]');
        const preview = imgBox.querySelector("img");
        const videoPreview = imgBox.querySelector("video");

        defaultImg.addEventListener("click", function () {
            fileUpload.click();
        });

        fileUpload.addEventListener("change", function () {
            previewFile(fileUpload, `#${preview.id}`, `#${videoPreview.id}`);
        });

        const btnChangeImage = imgBox.querySelector(".btn-edit-item:nth-child(1)");
        btnChangeImage.addEventListener("click", function () {
            fileUpload.click();
        });

        const btnDeleteImage = imgBox.querySelector(".btn-edit-item:nth-child(2)");
        btnDeleteImage.addEventListener("click", function () {
            preview.src = "https://www.wishket.com/static/renewal/img/partner/profile/icon_btn_add_portfolio_image.png";
            videoPreview.src = "";
            videoPreview.style.display = "none";
            const imgCaptionBox = imgBox.querySelector(".img-caption-box");
            const title = imgBox.querySelector(".img-box-title");
            const text = imgBox.querySelector(".img-box-text");
            const help = imgBox.querySelector(".img-box-help");

            imgCaptionBox.style.display = "none";
            title.style.display = "block";
            text.style.display = "block";
            help.style.display = "block";

            imgBox.style.display = "none";
            fileUpload.value = "";
        });
    }

    const fileUploadInputs = document.querySelectorAll('input[type="file"]');
    fileUploadInputs.forEach((fileInput) => {
        fileInput.addEventListener("change", function () {
            const file = fileInput.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                // 파일 서버로 업로드
                fetch("/audition/video/upload", {
                    method: "POST",
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.fileName && data.filePath) {
                            console.log("파일이 성공적으로 업로드되었습니다.");
                        } else {
                            console.error("파일 업로드 중 오류가 발생했습니다.");
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            }
        });
    });


});
