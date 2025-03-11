// function to ensure video persists and doesn't restart onload
function ensureVideoPersistence() {
    let videoContainer = document.querySelector("#video-container");
    let video = document.querySelector("#bg-video");

    if (!video) {
        console.warn("Video missing! Recreating...");
        video = document.createElement("video");
        video.id = "bg-video";
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.innerHTML = '<source src="assets/catacomb.mp4" type="video/mp4">';
        videoContainer.appendChild(video);
    }
}

// FLICKER EFFECT
function startFlickerEffect() {
    console.log("🔦 Starting flicker effect...");
    const flickerOverlay = document.querySelector(".flicker-overlay");

    if (!flickerOverlay) {
        console.error("ERROR: No .flicker-overlay found!");
        return;
    }

    gsap.set(flickerOverlay, { opacity: 0 });

    function flickerLoop() {
        gsap.to(flickerOverlay, {
            opacity: Math.random() * 0.6,
            duration: 0.05,
            onComplete: flickerLoop
        });
    }

    flickerLoop();
}

// FLOATING BUTTON ANIMATION
function reapplyFloatingAnimation() {
    gsap.to(".leftbtn, .rightbtn, .solebtn", {
        y: -15,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
}

// PLAY GYROSCOPE ON FIRST CLICK
function enableGyroscopeSound() {
    const gyroscopeSound = document.getElementById("gyroscopeSound");

    if (gyroscopeSound) {
        document.addEventListener("click", () => {
            console.log("Playing Gyroscope sound...");
            gyroscopeSound.volume = 0.2;
            gyroscopeSound.play().catch(error => console.warn("Gyroscope sound blocked:", error));
        }, { once: true });
    }
}

// PLAY SOUNDS
function playSound(soundId, volume = 1.0) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.volume = Math.min(Math.max(volume, 0), 1);
        sound.play().then(() => {
            console.log(`🎵 Playing ${soundId} at volume ${sound.volume}`);
        }).catch(error => console.warn(`🔇 ${soundId} blocked:`, error));
    } else {
        console.warn(`${soundId} not found.`);
    }
}



// FADE TO BLACK + TRY AGAIN FOR KILL SCREENS
function fadeToBlack(duration = 4) {
    console.log("🎭 Fading screen to black...");

    const flickerOverlay = document.querySelector(".flicker-overlay");
    const tryAgainContainer = document.getElementById("tryAgainContainer");
    const tryAgainButton = document.getElementById("tryAgainButton");

    if (!flickerOverlay || !tryAgainContainer || !tryAgainButton) {
        console.error("ERROR: Missing elements for fade effect!");
        return;
    }

    // STOP THE FLICKER LOOP BEFORE FADING
    gsap.killTweensOf(flickerOverlay);

    // FADE TO BLACK
    gsap.to(flickerOverlay, {
        opacity: 1,
        duration: duration,
        ease: "power3.out",
        onComplete: () => {
            console.log("Screen fully faded to black!");

            // make sure other buttons remain clickable before the fade
            flickerOverlay.style.pointerEvents = "none";

            // show "Try Again" button container & allow interaction
            tryAgainContainer.style.display = "block";
            tryAgainContainer.style.pointerEvents = "auto"; // allow clicking ONLY on Try Again button

            // fade in the button smoothly
            gsap.to(tryAgainButton, {
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            });

            // ensure button is clickable
            tryAgainButton.style.cursor = "pointer";

            // FORCE A FULL PAGE RELOAD ON CLICK
            tryAgainButton.addEventListener("click", () => {
                console.log("Restarting game...");
                window.location.href = "index.html"; // force reload
            });
        }
    });
}





// FUNCTION TO TRIGGER PAGE-SPECIFIC EFFECTS
function triggerPageEffects() {
    const contentDiv = document.querySelector("#main-content .content");
    if (!contentDiv) {
        console.error("ERROR: No `.content` found in `#main-content`!");
        return;
    }

    const pageEvent = contentDiv.getAttribute("data-event");
    const gyroscopeSound = document.getElementById("gyroscopeSound");

    console.log(`Triggering effects for: ${pageEvent}`);

    switch (pageEvent) {
        case "birds":
            playSound("birdsSound", 1.0);
            if (gyroscopeSound) {
                gsap.to(gyroscopeSound, { volume: 0, duration: 2, onComplete: () => gyroscopeSound.pause() });
                console.log("🔇 Fading out gyroscope sound...");
            }
            break;

        case "unfold":
            playSound("unfoldSound", 1.0);
            break;

        case "rumble":
            playSound("rumbleSound", 1.0);
            setTimeout(() => fadeToBlack(4)); 
            playSound("breathingSound,")
            gsap.to(".content", {
                x: "-10px",  // Increase the shake intensity
                duration: 0.1,  // Each shake happens faster
                repeat: 30,  // Increase number of shakes
                yoyo: true,
                ease: "power1.inOut",
                onComplete: () => {
                    console.log("🎭 Triggering fade to black after shaking!");
                    setTimeout(() => fadeToBlack(4)); // Add a small delay before fading
                }
            });
            
            
                if (gyroscopeSound) {
                    gsap.to(gyroscopeSound, { volume: 0, duration: 2, onComplete: () => gyroscopeSound.pause() });
                    console.log("🔇 Fading out gyroscope sound...");
                }
                break;
            

        case "fall":
            playSound("fallSound", 1.0);
            gsap.to(".content", {
                opacity: 0,
                duration: 3,
                delay: 2,
                ease: "power1.out"
            });
            break;

        case "throw":
            playSound("throwSound", 1.0);
            
            gsap.to(".content", {
                x: "-10px",  // Increase the shake intensity
                duration: 0.1,  // Each shake happens faster
                repeat: 30,  // Increase number of shakes
                yoyo: true,
                ease: "power1.inOut",
                onComplete: () => {
                    console.log("🎭 Triggering fade to black after shaking!");
                    setTimeout(() => fadeToBlack(4)); // Add a small delay before fading
                }
            });
            
            
                if (gyroscopeSound) {
                    gsap.to(gyroscopeSound, { volume: 0, duration: 2, onComplete: () => gyroscopeSound.pause() });
                    console.log("🔇 Fading out gyroscope sound...");
                }
                break;
            
            
    

        default:
            console.log("No page-specific effects for this page.");
    }
}

// FUNCTION TO LOAD AJAX PAGES
function loadPage(targetPage) {
    fetch(targetPage)
        .then(response => response.text())
        .then(html => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");

            let newContent = doc.querySelector(".content");
            if (!newContent) {
                console.error("ERROR: The new page has NO `.content` div!");
                return;
            }

            let mainContent = document.querySelector("#main-content");
            if (!mainContent) {
                console.error("ERROR: `#main-content` is missing in index.html!");
                return;
            }

            mainContent.innerHTML = newContent.outerHTML;
            console.log("Successfully replaced #main-content with new .content!");
            gsap.to(".content", { opacity: 1, duration: 0.5 });

            attachEventListeners();
            console.log("Running triggerPageEffects() after AJAX load...");
            setTimeout(triggerPageEffects, 200);
        })
        .catch(error => console.log("Error loading new page:", error));
}

// FUNCTION TO ATTACH EVENT LISTENERS (FOR AJAX & PAGE LOAD)
function attachEventListeners() {
    console.log("Attaching event listeners...");

    ensureVideoPersistence();
    reapplyFloatingAnimation();
    enableGyroscopeSound();
    startFlickerEffect();
    triggerPageEffects();

    document.querySelectorAll(".ajax-link").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let targetPage = this.getAttribute("href");

            gsap.to(".content", {
                opacity: 0,
                duration: 0.5,
                onComplete: () => loadPage(targetPage)
            });
        });
    });
}

// INITIALIZE EVERYTHING ON PAGE LOAD
document.addEventListener("DOMContentLoaded", attachEventListeners);

document.addEventListener("DOMContentLoaded", () => {
    console.log('event found');
    const blurredText = document.getElementById("blurred-text");
    const inputBox = document.getElementById("input-box");

    // ✅ Handle input changes and adjust blur effect
    inputBox.addEventListener("input", () => {
        const userInput = inputBox.value.trim().toLowerCase();
        const correctText = "me vivere vita mea";
        
        // Adjust blur effect dynamically
        let blurAmount = 10 - (userInput.length / correctText.length) * 10;
        blurredText.style.filter = `blur(${Math.max(blurAmount, 0)}px)`;
    });

    // ✅ Handle Enter key submission
    inputBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            console.log('enter key pressed');
            event.preventDefault();
            validateInput();
        }
    });

    function validateInput() {
        const userInput = inputBox.value.trim().toLowerCase();
        const correctText = "me vivere vita mea";

        if (userInput === correctText) {
            window.location.href = "l8correct.html";
        } else {
            window.location.href = "l8incorrect.html";
        }
    }

    // ✅ Restore blur if they stop typing
    inputBox.addEventListener("blur", () => {
        blurredText.style.filter = "blur(10px)";
    });

    // ✅ Keep AJAX Effects for Page Transitions
    document.querySelectorAll('.ajax-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            let targetPage = this.getAttribute('href');

            gsap.to(".content", {
                opacity: 0,
                duration: 0.5,
                onComplete: () => loadPage(targetPage)
            });
        });
    });
});