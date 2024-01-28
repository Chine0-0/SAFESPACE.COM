function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const correctUsername = "Namio.horny.com";
    const correctPassword = "Chine123104";

    if (username === correctUsername) {
      if (password === correctPassword) {
        // Redirect to another page after successful login
        window.location.href = "welcome.html";
      } else {
        document.getElementById("message").innerText = "Incorrect password!";
      }
    } else {
      document.getElementById("message").innerText = "Account name not found!";
    }
  }
  function logout() {
    // Clear local storage and redirect to login page
    localStorage.clear();
    window.location.href = "welcome.html";
  }

  // Prevent user from using browser back button after logout
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    history.go(1);
  };

  window.onload = function() {
    loadSavedFiles();
  };

  function toggleContent(id) {
    const panel = document.getElementById(id);
    panel.classList.toggle("active");
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }

  function addFile(inputId, carouselId) {
    const fileInput = document.getElementById(inputId);
    const file = fileInput.files[0];
    const fileCarousel = document.getElementById(carouselId);
    const newItem = document.createElement('div');
    newItem.classList.add('item');
    
    if (inputId === 'pictureInput' && file.type.startsWith('image')) {
      newItem.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="${file.name}">`;
      fileCarousel.appendChild(newItem);
    } else if (inputId === 'videoInput' && file.type === 'video/mp4') {
      newItem.innerHTML = `<video controls><source src="${URL.createObjectURL(file)}" type="video/mp4">Your browser does not support the video tag.</video>`;
      fileCarousel.appendChild(newItem);
    } else if (inputId === 'musicInput' && file.type.startsWith('audio')) {
      newItem.innerHTML = `<audio controls><source src="${URL.createObjectURL(file)}" type="${file.type}">Your browser does not support the audio tag.</audio>`;
      fileCarousel.appendChild(newItem);
    } else if (inputId === 'documentInput' && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      newItem.innerHTML = `<p>${file.name}</p>`;
      fileCarousel.appendChild(newItem);
    } else {
      alert('Invalid file type for this category.');
    }

    saveFile(inputId, file);
  }

  function saveFile(inputId, file) {
    // Save file to local storage
    const files = JSON.parse(localStorage.getItem(inputId)) || [];
    files.push({ name: file.name, type: file.type, src: URL.createObjectURL(file) });
    localStorage.setItem(inputId, JSON.stringify(files));
  }

  function loadSavedFiles() {
    // Load saved files from local storage
    const inputs = ['pictureInput', 'videoInput', 'musicInput', 'documentInput'];
    inputs.forEach(inputId => {
      const files = JSON.parse(localStorage.getItem(inputId)) || [];
      const carouselId = inputId.replace('Input', 'Carousel');
      const fileCarousel = document.getElementById(carouselId);
      files.forEach(file => {
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        if (inputId === 'pictureInput') {
          newItem.innerHTML = `<img src="${file.src}" alt="${file.name}">`;
        } else if (inputId === 'videoInput') {
          newItem.innerHTML = `<video controls><source src="${file.src}" type="${file.type}">Your browser does not support the video tag.</video>`;
        } else if (inputId === 'musicInput') {
          newItem.innerHTML = `<audio controls><source src="${file.src}" type="${file.type}">Your browser does not support the audio tag.</audio>`;
        } else if (inputId === 'documentInput') {
          newItem.innerHTML = `<p>${file.name}</p>`;
        }
        fileCarousel.appendChild(newItem);
      });
    });
  }

  function logout() {
    // Clear local storage and redirect to login page
    localStorage.clear();
    window.location.href = "SAFESPACE.html";
  }

  // Prevent user from using browser back button after logout
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    history.go(1);
  };