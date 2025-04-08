document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('user-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      localStorage.setItem('user', JSON.stringify({ name, email, subject }));
      localStorage.setItem("startTime", Date.now()); // Track start time
      window.location.href = 'test.html';
    });
  }

  const testTitle = document.getElementById('test-title');
  const quizContainer = document.getElementById('quiz-container');
  const submitBtn = document.getElementById('submit-btn');
  const scoreDisplay = document.getElementById('score');

  if (quizContainer) {
    const user = JSON.parse(localStorage.getItem('user'));
    const subject = user.subject;

    fetch(`data/${subject}.json`)
      .then(res => res.json())
      .then(data => {
        if (testTitle) testTitle.textContent = `${subject.toUpperCase()} Test`;

        data.questions.forEach((q, i) => {
          const div = document.createElement('div');
          div.innerHTML = `<p><strong>Q${i + 1}:</strong> ${q.question}</p>`;
          q.options.forEach((opt, j) => {
            div.innerHTML += `<label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label><br>`;
          });
          quizContainer.appendChild(div);
        });

        submitBtn.addEventListener('click', () => {
          let score = 0;
          const startTime = localStorage.getItem("startTime");
          const timeTaken = Math.floor((Date.now() - startTime) / 1000);

          data.questions.forEach((q, i) => {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (selected && selected.value === q.answer) score++;
          });

          const totalQuestions = data.questions.length;
          scoreDisplay.textContent = `Score: ${score}/${totalQuestions}`;
          const currentDate = new Date().toLocaleDateString();

          emailjs.send("service_2d6f80j", "template_fjr2x0p", {
            user_name: user.name,
            user_email: user.email,
            subject: subject,
            score: score,
            total_questions: totalQuestions,
            date: currentDate,
            time_taken: timeTaken
          });

          submitBtn.disabled = true;
        });
      });
  }
});