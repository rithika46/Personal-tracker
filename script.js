document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('expense-form');
  const descInput = document.getElementById('desc');
  const amtInput = document.getElementById('amt');
  const catInput = document.getElementById('category');
  const dateInput = document.getElementById('date');
  const list = document.getElementById('expense-list');

                                            
  const budgets = {                                        // sets the budget limits
    "Food & Dining": 5000,
    "Transportation": 3000,
    "Entertainment": 5000
  };

  
  const totals = {                                 // Initialize totals at zero
    "Food & Dining": 0,
    "Transportation": 0,
    "Entertainment": 0
  };


  const idMap = {
    "Food & Dining": "food",
    "Transportation": "transportation",
    "Entertainment": "entertainment"
  };

  form.onsubmit = function(e) {
    e.preventDefault();
    const desc = descInput.value.trim();
    const amt = Number(amtInput.value.trim());
    const cat = catInput.value;
    const date = dateInput.value;
    if (!desc || !amt || !cat || !date) return;

   
    const li = document.createElement('li');
    li.textContent = `${desc} | ₹${amt} | ${cat} | ${date}`;
    list.appendChild(li);


    if (totals.hasOwnProperty(cat)) {
      totals[cat] += amt;
      const id = idMap[cat];
      const usedElem = document.getElementById(id + '-used');
      const barElem = document.getElementById(id + '-bar');
      if (usedElem && barElem) {
        usedElem.textContent = `₹${totals[cat]}`;
        const percent = Math.min(100, (totals[cat] / budgets[cat]) * 100);
        barElem.style.setProperty('--used', percent + '%');
        if (totals[cat] > budgets[cat]) {
          barElem.classList.add('over-budget');
        } else {
          barElem.classList.remove('over-budget');
        }
      }
    }

    form.reset();
  };
});
