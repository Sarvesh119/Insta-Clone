class BudgetTracker {
      constructor() {
        this.transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        this.list = document.getElementById("transaction-list");
        this.incomeEl = document.getElementById("total-income");
        this.expenseEl = document.getElementById("total-expense");
        this.balanceEl = document.getElementById("balance");
        this.render();
      }

      addTransaction(title, amount, type) {
        const transaction = {
          id: Date.now(),
          title,
          amount: +amount,
          type,
          time: new Date().toLocaleString()
        };
        this.transactions.push(transaction);
        this.save();
      }

      deleteTransaction(id) {
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.save();
      }

      clearAll() {
        this.transactions = [];
        this.save();
      }

      save() {
        localStorage.setItem("transactions", JSON.stringify(this.transactions));
        this.render();
      }

      render() {
        this.list.innerHTML = "";
        let income = 0, expense = 0;
        this.transactions.forEach(t => {
          const li = document.createElement("li");
          li.innerHTML = `${t.title} (${t.time}) <span class="${t.type}">${t.type === 'income' ? '+' : '-'}${t.amount}</span>
            <button onclick="tracker.deleteTransaction(${t.id})">❌</button>`;
          this.list.appendChild(li);
          if (t.type === "income") income += t.amount;
          else expense += t.amount;
        });
        this.incomeEl.textContent = income;
        this.expenseEl.textContent = expense;
        this.balanceEl.textContent = income - expense;
      }
    }

    const tracker = new BudgetTracker();

    document.getElementById("transaction-form").addEventListener("submit", e => {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const amount = document.getElementById("amount").value;
      const type = document.getElementById("type").value;
      tracker.addTransaction(title, amount, type);
      e.target.reset();
    });

    document.getElementById("clear").addEventListener("click", () => tracker.clearAll());

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    });

    const toggleBtn = document.getElementById("theme-toggle");
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      if (document.body.classList.contains("dark")) {
        toggleBtn.textContent = "☀️ Light Mode";
      } else {
        toggleBtn.textContent = "🌙 Dark Mode";
      }
    });