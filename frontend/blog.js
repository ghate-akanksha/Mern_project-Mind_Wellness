function toggleContent(button) {
    const moreText = button.previousElementSibling;

    if (moreText.style.display === "none" || moreText.style.display === "") {
        moreText.style.display = "block";
        button.innerText = "Read Less";
    } else {
        moreText.style.display = "none";
        button.innerText = "Read More";
    }
}
