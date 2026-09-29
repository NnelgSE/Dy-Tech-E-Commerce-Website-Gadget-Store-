document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".calculator-tabs button");
  const [priceInput, downInput, rateInput] = document.querySelectorAll(
    ".calculator-inputs input"
  );
  const periodSelect = document.querySelector(".calculator-inputs select");
  const rows = document.querySelectorAll(".payment-details .detail-row strong");
  const totalEl = document.querySelector(".total-row strong");
  const monthlyEl = document.querySelector(".main-payment strong");
  const paymentsEl = document.querySelector(".main-payment small");
  const btn = document.querySelector(".calculator-button");
 
  // "monthly" = interest is a flat % of the amount financed
  // "yearly"  = interest is an annual % (prorated by number of months)
  let mode = "monthly";
  let latest = {};
 
  const peso = (n) =>
    "₱" + n.toLocaleString("en-PH", { maximumFractionDigits: 2 });
 
  function calculate() {
    const price = Math.max(parseFloat(priceInput.value) || 0, 0);
    let down = Math.max(parseFloat(downInput.value) || 0, 0);
    if (down > price) down = price;
    const rate = Math.max(parseFloat(rateInput.value) || 0, 0);
    const months = parseInt(periodSelect.value, 10) || 1;
 
    const financed = price - down;
    const interest =
      mode === "yearly"
        ? financed * (rate / 100) * (months / 12)
        : financed * (rate / 100);
    const total = financed + interest;
    const monthly = total / months;
 
    rows[0].textContent = peso(price);
    rows[1].textContent = peso(down);
    rows[2].textContent = peso(financed);
    rows[3].textContent = peso(interest);
    totalEl.textContent = peso(total);
    monthlyEl.textContent = peso(monthly);
    paymentsEl.textContent = months + " payments";
 
    latest = { price, down, financed, interest, months, monthly, total, mode };
  }
 
  [priceInput, downInput, rateInput].forEach((el) =>
    el.addEventListener("input", calculate)
  );
  periodSelect.addEventListener("change", calculate);
 
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("Btn-active");
        t.classList.add("Btn");
      });
      tab.classList.remove("Btn");
      tab.classList.add("Btn-active");
      mode = i === 0 ? "monthly" : "yearly";
      calculate();
    });
  });
 
  // Proceeding to Checkout Page
  btn.addEventListener("click", () => {
    try {
      sessionStorage.setItem("installmentPlan", JSON.stringify(latest));
    } catch (e) {}
 
    alert("Proceeding to checkout...");
 
    // runs only after the user clicks OK
    window.location.href = "checkout.html";
  });
 
  calculate();
});