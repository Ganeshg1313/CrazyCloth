import { selectedCategory, updateCategory } from "./sharedVariables.js";

const categorybtn = [...document.getElementsByClassName('category')];

categorybtn.forEach(btn => {
    btn.addEventListener("click", () => {
        let id = btn.dataset.catid;
        updateCategory(id);
        window.location.assign('dynamicProducts.html')
    })
})