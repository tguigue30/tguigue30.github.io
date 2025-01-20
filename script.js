document.addEventListener("DOMContentLoaded", (event) => {
  const githubButton = document.getElementById("githubButton");
  const image = document.getElementById("logoImage");
  const currentTimeElement = document.getElementById("currentTime");
  const h1Element = document.querySelector("h1");
  const h2Element = document.querySelector("h2");

  function addHoverEffect(button) {
    button.addEventListener("mouseover", () => {
      button.style.borderRadius = "10px";
      button.style.transform = "scale(1.2)";
    });

    button.addEventListener("mouseout", () => {
      button.style.borderRadius = "5px";
      button.style.transform = "scale(1)";
    });
  }

  addHoverEffect(githubButton);

  image.addEventListener("mouseover", () => {
    image.style.transform = "scale(1.1)";
    image.style.borderRadius = "5px";
    image.style.backgroundColor = "white";
  });

  image.addEventListener("mouseout", () => {
    image.style.transform = "scale(1)";
    image.style.borderRadius = "0px";
    image.style.backgroundColor = "transparent";
  });

  function updateTime() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Les mois commencent à 0
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    currentTimeElement.textContent = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  }

  setInterval(updateTime, 1000);
  updateTime(); // Initial call to display time immediately

  function typeWriter(element, text, delay = 100) {
    let i = 0;
    const cursor = document.createElement("span");
    cursor.classList.add("cursor");
    element.appendChild(cursor);

    function type() {
      if (i < text.length) {
        const span = document.createElement("span");

        if (text.substring(i, i + 5) === "print") {
          span.classList.add("keyword");
          span.textContent = "print";
          i += 5;
        } else if (text.substring(i, i + 4) === "Théo") {
          span.classList.add("function-name");
          span.textContent = "Théo";
          i += 4;
        } else if (text.substring(i, i + 6) === "Guigue") {
          span.classList.add("variable");
          span.textContent = "Guigue";
          i += 6;
        } else {
          span.textContent = text.charAt(i);
          i++;
        }

        cursor.insertAdjacentElement("beforebegin", span);
        setTimeout(type, delay);
      } else {
        cursor.remove();
      }
    }
    type();
  }

  // Clear the initial content and start typing effect
  h1Element.innerHTML = "";
  h2Element.innerHTML = "";
  typeWriter(h1Element, "print('Théo Guigue')", 150); // Apparition lettre par lettre pour h1
  typeWriter(h2Element, "#Student at the Montpellier University", 150);
});
