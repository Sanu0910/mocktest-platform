document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('user-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const timeLimit = parseInt(document.getElementById('time').value, 10) * 60;
      localStorage.setItem('user', JSON.stringify({ name, email, subject, timeLimit }));
      localStorage.setItem("startTime", Date.now());
      window.location.href = 'test.html';
    });
  }

  const testTitle = document.getElementById('test-title');
  const quizContainer = document.getElementById('quiz-container');
  const submitBtn = document.getElementById('submit-btn');
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timer');

  if (quizContainer && submitBtn) {
    const user = JSON.parse(localStorage.getItem('user'));
    const subject = user.subject;
    let timer, remainingTime = user.timeLimit;

    fetch(`data/${subject}.json`)
      .then(res => res.json())
      .then(data => {
        if (testTitle) testTitle.textContent = `${subject.toUpperCase()} Test`;

        data.questions.forEach((q, i) => {
          const div = document.createElement('div');
          div.className = 'question-block';
          div.innerHTML = `<p><strong>Q${i + 1}:</strong> ${q.question}</p>`;
          q.options.forEach((opt) => {
            div.innerHTML += `
              <label>
                <input type="radio" name="q${i}" value="${opt}">
                ${opt}
              </label><br>`;
          });
          quizContainer.appendChild(div);
        });

        const updateTimer = () => {
          let minutes = Math.floor(remainingTime / 60);
          let seconds = remainingTime % 60;
          timerDisplay.textContent = `⏳ Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          if (remainingTime <= 0) {
            clearInterval(timer);
            submitBtn.click();
          }
          remainingTime--;
        };
        updateTimer();
        timer = setInterval(updateTimer, 1000);

        submitBtn.addEventListener('click', () => {
          clearInterval(timer);
          let score = 0;
          const startTime = localStorage.getItem("startTime");
          const timeTaken = Math.floor((Date.now() - startTime) / 1000);
          const totalQuestions = data.questions.length;
          let reviewHTML = `<h2>Thank you, ${user.name}!</h2><p>Your score: <strong>${score}/${totalQuestions}</strong></p>`;
          
          data.questions.forEach((q, i) => {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            const answer = q.answer;
            const selectedVal = selected ? selected.value : "No answer";
            const correct = selectedVal === answer;
            reviewHTML += `<div class="review ${correct ? 'correct' : 'wrong'}">
              <p><strong>Q${i + 1}:</strong> ${q.question}</p>
              <p>Your Answer: ${selectedVal}</p>
              <p>Correct Answer: ${answer}</p>
            </div>`;
            if (correct) score++;
          });

          scoreDisplay.innerHTML = reviewHTML;
          const currentDate = new Date().toLocaleDateString();

          emailjs.send("service_2d6f80j", "template_ap0b5t8", {
            user_name: user.name,
            user_email: user.email,
            subject: subject,
            score: score,
            total_questions: totalQuestions,
            date: currentDate,
            time_taken: timeTaken
          }).then(function(response) {
            console.log("✅ Email sent successfully:", response);
            let scores = JSON.parse(localStorage.getItem('leaderboard')) || [];
            scores.push({ name: user.name, subject: subject, score: score, total: totalQuestions });
            localStorage.setItem('leaderboard', JSON.stringify(scores));

            setTimeout(() => {
              window.location.href = 'index.html';
            }, 8000);
          }, function(error) {
            console.error("❌ EmailJS error:", error);
            alert("❌ Failed to send email. Please check your EmailJS settings.");
          });

          submitBtn.disabled = true;
        });
      });
  }
});
