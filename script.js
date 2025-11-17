// Select all lines
const lines = document.querySelectorAll("#about .line");
const cursor = document.querySelector("#about .cursor");

// Function to type lines
function typeLines() {
  let delay = 0;
  let currentLine = 0;

  lines.forEach((line, index) => {
    const fullText = line.dataset.text; // Get text from data-text attribute
    line.textContent = ""; // Clear the text content
    line.style.opacity = 1; // Make the line visible

    // Remove previous cursor
    const prevCursor = line.querySelector('.cursor');
    if (prevCursor) prevCursor.remove();

    // Add cursor to current line
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '_';
    line.appendChild(cursor);

    // Type each character
    for (let i = 0; i < fullText.length; i++) {
      setTimeout(() => {
        line.textContent = fullText.substring(0, i + 1);
        // Re-append cursor after updating text
        line.appendChild(cursor);
      }, delay + i * 50); // 50ms per character
    }

    // Move cursor to next line
    setTimeout(() => {
      cursor.remove();
      if (index < lines.length - 1) {
        const nextLine = lines[index + 1];
        nextLine.appendChild(cursor);
      }
    }, delay + fullText.length * 50);

    delay += fullText.length * 50 + 200; // Add delay for the next line
  });
}

// Trigger typing only when About section is visible
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

let typed = false;
window.addEventListener("scroll", () => {
  const aboutSection = document.getElementById("about");
  if (!typed && isElementInViewport(aboutSection)) {
    typeLines();
    typed = true; // Only type once
  }
});

// Add this to your existing script.js

function animateSkills() {
    const skills = document.querySelectorAll('#skills .skill');
    const container = document.querySelector('#skills .skill-container');
    const lines = document.querySelectorAll('#skills .line');
    
    // Animate the header lines first
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, index * 200);
    });
    
    // Then animate the skills
    setTimeout(() => {
        container.style.opacity = '1';
        
        skills.forEach(skill => {
            const progress = skill.querySelector('.progress');
            const percentage = skill.querySelector('.percentage');
            const targetPercent = progress.getAttribute('data-percent');
            let currentPercent = 0;
            
            const interval = setInterval(() => {
                if (currentPercent >= targetPercent) {
                    clearInterval(interval);
                    return;
                }
                
                currentPercent++;
                progress.style.width = `${currentPercent}%`;
                percentage.textContent = `${currentPercent}%`;
            }, 20);
        });
    }, 600);
}

let skillsAnimated = false;

window.addEventListener('scroll', () => {
    const skillsSection = document.getElementById('skills');
    if (isElementInViewport(skillsSection) && !skillsAnimated) {
        animateSkills();
        skillsAnimated = true;
    }
});

// Typewriter-like line reveal
document.addEventListener("DOMContentLoaded", () => {
  const lines = document.querySelectorAll(".typing-line");
  lines.forEach((line, i) => {
    setTimeout(() => line.classList.add("visible"), i * 1200);
  });
});


//
document.addEventListener("DOMContentLoaded", () => {
  const screen = document.getElementById("terminal-screen");
  const cursor = document.querySelector(".cursor");

  const lines = [
    "> Initializing Retro Portfolio...",
    "> Loading modules: [Web Dev] [Cybersecurity] [Creativity]",
    "> User: Aakash Dhami",
    "> Status: Passionate Developer & Security Enthusiast",
    "> Welcome! Explore my work, projects, and journey below."
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentLine = "";
  
  function type() {
    if (lineIndex < lines.length) {
      if (charIndex < lines[lineIndex].length) {
        currentLine += lines[lineIndex][charIndex];
        screen.innerHTML = currentLine + "<br>";
        charIndex++;
        setTimeout(type, 50); // typing speed
      } else {
        currentLine += "<br>";
        lineIndex++;
        charIndex = 0;
        setTimeout(type, 500); // pause between lines
      }
    } else {
      // All lines typed, cursor stays at the end
      screen.appendChild(cursor);
    }
  }

  type();
});
