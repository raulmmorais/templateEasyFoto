function addRow(e, t, n) {
    var d = document.createElement("tr"),
        a = document.createElement("td");
    a.textContent = 5 + n + " Miniquadros", d.appendChild(a), (a = document.createElement("td")).textContent = "5", d.appendChild(a), (a = document.createElement("td")).textContent = n, d.appendChild(a), (a = document.createElement("td")).textContent = "R$" + (e + n * t).toFixed(2).replace(".", ","), d.appendChild(a), document.getElementById("prices").appendChild(d)
}
var priceBase = 150,
    additional = 27;
document.getElementById("price").textContent = "R$" + priceBase.toFixed(2).replace(".", ","), document.getElementById("additional").textContent = "R$" + additional.toFixed(2).replace(".", ",");
for (var i = 0; i < 11; i++) addRow(priceBase, additional, i);
var hasWebP = !1;
! function () {
    function e() {
        document.body.classList.add("nowebp")
    }
    var t = new Image;
    t.onload = function () {
        t.height > 0 && t.width > 0 || e()
    }, t.onerror = function () {
        e()
    }, t.src = "webp/gallery/1.webp"
}()

function gtag() {
    dataLayer.push(arguments)
}
window.dataLayer = window.dataLayer || [], gtag("js", new Date), gtag("config", "UA-117906072-1")