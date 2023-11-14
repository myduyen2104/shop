const btns = document.querySelectorAll(".add-to-cart");

btns.forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        var product = button.closest(".item");
        var productImg = product.querySelector(".released-only").src;
        var productName = product.querySelector(".name").innerText;
        var productPrice = product.querySelector(".price-sale").innerText;

        addcart(productPrice, productName, productImg);
    });
});

function addcart(productPrice, productName, productImg) {
    var addtr = document.createElement("tr");
    var cartItems = document.querySelectorAll("tbody tr");

    for (var i = 0; i < cartItems.length; i++) {
        var productT = cartItems[i].querySelector("td:first-child"); // Lấy phần tử đầu tiên (hình ảnh và tên sản phẩm) của mỗi hàng trong giỏ hàng
        var existingProductName = productT.innerText; // Lấy tên sản phẩm hiện tại trong giỏ hàng

        if (existingProductName.includes(productName)) {
            alert("Sản phẩm của bạn hiện đã có trong giỏ hàng!");
            return;
        }
    }

    var trcontent = '<tr><td style="display: flex;align-items: center;"><img src="' + productImg + '" alt="' + productName + '">' + productName + '</td><td><p><span>' + productPrice + '</span></p></td><td><input style="width: 30px;outline: none;" type="number" value="1" min="1"></td><td style="cursor: pointer;">Xóa</td></tr>';
    addtr.innerHTML = trcontent;

    var cartTable = document.querySelector("tbody");
    cartTable.appendChild(addtr);

    carttotal();
}

function carttotal() {
    var cartItems = document.querySelectorAll("tbody tr");
    var total = 0;

    cartItems.forEach(function (item) {
        var deleteButton = item.querySelector("td:last-child");
        deleteButton.addEventListener("click", function () {
            item.classList.add("fade-out"); // Thêm lớp fade-out để kích hoạt hiệu ứng fade-out

            setTimeout(function () {
                item.remove(); // Xóa sản phẩm khỏi DOM sau khi hiệu ứng fade-out hoàn thành
                carttotal(); // Cập nhật tổng giá trị giỏ hàng sau khi xóa sản phẩm
            }, 500); // Chờ 0.5 giây (theo thời gian của hiệu ứng fade-out) trước khi xóa sản phẩm
        });

        var priceString = item.querySelector("td:nth-child(2) span").innerText;
        var price = parseFloat(priceString.replace(/\D/g, ''));
        var quantity = parseInt(item.querySelector("td:nth-child(3) input").value);
        total += price * quantity;
    });

    var totalPriceElement = document.querySelector(".cart .price-total span");
    totalPriceElement.innerText = total.toLocaleString();
    inputChange()
}

function inputChange() {
    var cartItems = document.querySelectorAll("tbody tr");
    for (var i = 0; i < cartItems.length; i++) {
        var inputValue = cartItems[i].querySelector("input")
        inputValue.addEventListener("change", function () {
            carttotal()
        })
    }
}


const cartIcon = document.querySelector('.shopping-cart-icon');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.close-cart');

// Hiển thị giỏ hàng khi nhấn vào icon giỏ hàng
cartIcon.addEventListener('click', function () {
    cartOverlay.style.display = 'flex';
});

// Ẩn giỏ hàng khi nhấn vào nút đóng giỏ hàng
closeCartBtn.addEventListener('click', function () {
    cartOverlay.style.display = 'none';
});



