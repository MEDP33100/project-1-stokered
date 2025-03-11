// ✅ Ensure Background Video Persistence (Avoids Restarting)
function ensureVideoPersistence() {
    let videoContainer = document.querySelector("#video-container");
    let video = document.querySelector("#bg-video");

    if (!video) {
        console.warn("⚠️ Video missing! Recreating...");
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

// Enable Gyroscope Sound (Triggers on First Click)
function enableGyroscopeSound() {
    const gyroscopeSound = document.getElementById("gyroscopeSound");

    if (gyroscopeSound) {
        document.addEventListener("click", () => {
            console.log("🔊 Playing Gyroscope sound...");
            gyroscopeSound.volume = 0.3;
            gyroscopeSound.play().catch(error => console.warn("🔇 Gyroscope sound blocked:", error));
        }, { once: true });
    }
}

// Horror Flicker Effect (Keeps Playing Across Pages)
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

// Floating Button Animation (Keeps Hover Effects)
function reapplyFloatingAnimation() {
    gsap.to(".leftbtn, .rightbtn, .solebtn", {
        y: -15,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
}

// ✅ Play Sound Effects (For Different Pages)
function playSound(soundId, volume = 1.0) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.volume = Math.min(Math.max(volume, 0), 1);
        sound.play().catch(error => console.warn(`🔇 ${soundId} blocked:`, error));
    } else {
        console.warn(`⚠️ ${soundId} not found.`);
    }
}

// ✅ Page-Specific Effects (Trigger Sounds & Animations)
function triggerPageEffects() {
    const contentDiv = document.querySelector("#main-content .content");
    if (!contentDiv) {
        console.error("❌ ERROR: No `.content` found in `#main-content`!");
        return;
    }

// ✅ Fade to Black (Used for "rumble" death scene)
// ✅ Fade to Black (Now Hides Restart Button on Death Screens)
function fadeToBlack(duration = 4) {
    console.log("🎭 Fading screen to black...");

    const flickerOverlay = document.querySelector(".flicker-overlay");
    const tryAgainContainer = document.getElementById("tryAgainContainer");
    const tryAgainButton = document.getElementById("tryAgainButton");
    const gyroscopeSound = document.getElementById("gyroscopeSound");

    if (!flickerOverlay || !tryAgainContainer || !tryAgainButton) {
        console.error("❌ ERROR: Missing elements for fade effect!");
        return;
    }

    // ✅ FIX: Move restartButton inside setTimeout to ensure AJAX has loaded it
    setTimeout(() => {
        let restartButton = document.getElementById("home-button"); // ✅ Re-grab the button AFTER AJAX loads
        if (restartButton) {
            console.log("🚫 Hiding Restart button on death scene...");
            restartButton.style.display = "none";  // ✅ Properly hides it now!
        } else {
            console.warn("⚠️ Restart button not found (might not be loaded yet).");
        }
    }, 300); // Small delay to ensure AJAX has loaded the button

    // Stop flickering before fading
    gsap.killTweensOf(flickerOverlay);

    // Fade gyroscope sound (if playing)
    if (gyroscopeSound) {
        gsap.to(gyroscopeSound, { volume: 0, duration: 2, onComplete: () => gyroscopeSound.pause() });
        console.log("🔇 Fading out gyroscope sound...");
    }

    // Fade screen to black
    gsap.to(flickerOverlay, {
        opacity: 1,
        duration: duration,
        ease: "power3.out",
        delay: 3,
        onComplete: () => {
            console.log("🎭 Screen fully faded to black!");

            // Prevent interaction with other buttons
            flickerOverlay.style.pointerEvents = "none";

            // Show "Try Again" button container & allow interaction
            tryAgainContainer.style.display = "block";
            tryAgainContainer.style.pointerEvents = "auto"; // Allow clicking ONLY on Try Again button

            // Fade in the button smoothly
            gsap.to(tryAgainButton, {
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            });

            // Ensure button is clickable
            tryAgainButton.style.cursor = "pointer";

            // FORCE A FULL PAGE RELOAD ON CLICK
            tryAgainButton.addEventListener("click", () => {
                console.log("🔄 Restarting game...");
                window.location.href = "index.html"; // Force reload
            });
        }
    });
}



    const pageEvent = contentDiv.getAttribute("data-event");
    console.log(`🎭 Triggering effects for: ${pageEvent}`);

    switch (pageEvent) {
        case "birds":
            playSound("birdsSound", 1.0);

            if (gyroscopeSound) {
                gsap.to(gyroscopeSound, { volume: 0, duration: 2, onComplete: () => gyroscopeSound.pause() });
                console.log("🔇 Fading out gyroscope sound...");
            }
            break;

        case "rattle":
            console.log("⏳ Delaying rattle sound by 1 second...");
    
            setTimeout(() => {
                playSound("rattleSound", 2.0);  // ✅ Plays after 1 second
                console.log("🔊 Rattle sound played!");
            }, 1000); // ⏳ 1000ms (1 second) delay

            break;

            

        case "unfold":
            playSound("unfoldSound", 1.0);
            
            let note = document.querySelector(".note");
            
            if (note) {
                console.log("📜 Fading in the note...");
                gsap.set(note, { top: "5%", left: "50%", transform: "translate(-50%, -50%)" }); // force position
            
                gsap.to(note, { 
                    opacity: 1, 
                    scale: 1, 
                    top: "50%",  // ✅ Forces it to stay in the center
                    duration: 1, 
                    ease: "power2.out" 
                });
            } else {
                console.warn("⚠️ No note found for animation.");
                }
            break;
            
            
            
        case "rumble":
            playSound("rumbleSound", 1.0);
            gsap.to(".content", { x: "-10px", duration: 0.1, repeat: 30, yoyo: true, ease: "power1.inOut" });
            setTimeout(() => fadeToBlack(4), 500);
            break;

        
        case "fall":
            playSound("fallSound", 1.0);
            playSound("breathingSound", 1.0);
            if (gyroscopeSound) {
                gsap.to(gyroscopeSound, { volume: 0, duration: 2, onComplete: () => gyroscopeSound.pause() });
                console.log("🔇 Fading out gyroscope sound...");
            }
            gsap.to(".content", { opacity: 0, duration: 3, delay: 2, ease: "power1.out" });
            setTimeout(() => fadeToBlack(4), 500);
            break;

        case "throw":
            console.log("🪨 Throw event triggered...");
            
            // ✅ Play both sounds immediately
            playSound("throwSound", 1.0);
            playSound("breathingSound", 1.0);
            
            // ✅ Delay fade to black by 2 seconds
            setTimeout(() => {
                console.log("🎭 Fading to black after 2-second delay...");
                fadeToBlack(4); // ✅ Fades out over 4 seconds (adjust as needed)
            }, 2000);
            
            break;
               

        
        default:
            console.log("✅ No special effects for this page.");
    }
}

// ✅ AJAX Page Loading (Ensures Smooth Transitions)
function loadPage(targetPage) {
    fetch(targetPage)
        .then(response => response.text())
        .then(html => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");

            let newContent = doc.querySelector(".content");
            if (!newContent) {
                console.error("❌ ERROR: The new page has NO `.content` div!");
                return;
            }

            let mainContent = document.querySelector("#main-content");
            if (!mainContent) {
                console.error("❌ ERROR: `#main-content` is missing in index.html!");
                return;
            }

            mainContent.innerHTML = newContent.outerHTML;
            console.log("✅ Successfully replaced #main-content with new .content!");

            gsap.to(".content", { opacity: 1, duration: 0.5 });

            reattachInteractiveElements();
            setTimeout(triggerPageEffects, 200);
        })
        .catch(error => console.log("Error loading new page:", error));
}

// Reattach Events After AJAX Loads
function reattachInteractiveElements() {
    console.log("Reattaching event listeners for dynamic content...");
    ensureVideoPersistence();
    reapplyFloatingAnimation();
    enableGyroscopeSound();
    startFlickerEffect();
    triggerPageEffects();
    addHomeButton();

    // Ensure text input validation reattaches on `l7grid.html`
    if (document.getElementById("input-box")) {
        console.log("Reinitializing text input validation...");
        setupTextValidation();
    } else {
        console.warn("⚠️ No input box detected.");
    }

    // Reattach AJAX listeners
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

// ✅ Text Input Validation for l7grid.html (Ensures It Works After AJAX Load)
function setupTextValidation() {
    console.log("Setting up text input validation...");

    const inputBox = document.getElementById("input-box");
    const submitButton = document.getElementById("submit-button");

    if (!inputBox || !submitButton) {
        console.error("ERROR: Input box or submit button not found!");
        return;
    }

    submitButton.addEventListener("click", function () {
        console.log("Submit button clicked, validating input...");
        
        let userInput = inputBox.value.trim().toLowerCase();
        const correctText = "me vivere vita mea"; // Change this if needed
        
        console.log(`Checking input: "${userInput}"`);

        if (userInput === correctText) {
            console.log("Correct answer! Redirecting...");
            loadPage("l8correct.html");
        } else {
            console.log("Incorrect answer! Redirecting...");
            loadPage("l8incorrect.html");
        }
    });
}

function addHomeButton() {
    // Check if the button already exists (prevents duplicates)
    if (document.getElementById("home-button")) {
        return;
    }

    // Create the button element
    let homeButton = document.createElement("div");
    homeButton.id = "home-button";
    homeButton.innerHTML = `<a href="index.html" class="ajax-link">🔄 Restart</a>`;

    // Append it to the body
    document.body.appendChild(homeButton);
}

// Run the function on page load
document.addEventListener("DOMContentLoaded", () => {
    addHomeButton();
});

// Initialize Everything on Page Load
document.addEventListener("DOMContentLoaded", reattachInteractiveElements);
