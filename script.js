document.addEventListener('DOMContentLoaded', function() {
            const yesBtn = document.getElementById('yesBtn');
            const noBtn = document.getElementById('noBtn');
            const hiddenMessage = document.getElementById('hiddenMessage');
            const container = document.querySelector('.container');
            
            // Array of messages when trying to click No
            const noMessages = [
                "Are you sure?",
                "Think again!",
                "Really?",
                "Please reconsider!",
                "Give it another thought!",
                "This could be a mistake!",
                "Have a heart!",
                "Don't do this!",
                "Last chance!",
                "You're breaking my heart!"
            ];



            const yesMessages = [
                "Are you sure?",
                "Think again!",
                "Really?",
                
            ];
            
            let noClickCount = 0;
            let isMoving = false;
            
            // Handle Yes button click
            yesBtn.addEventListener('click', function() {
                hiddenMessage.style.display = 'block';
                yesBtn.style.display = 'none';
                noBtn.style.display = 'none';
                
                // Add some floating hearts animation for celebration
                for (let i = 0; i < 15; i++) {
                    setTimeout(() => createFloatingHeart(), i * 100);
                }
                
                // Scroll to show the message on mobile
                hiddenMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
            
            // Handle No button interaction for touch devices
            noBtn.addEventListener('touchstart', function(e) {
                e.preventDefault();
                moveNoButton();
            });
            
            noBtn.addEventListener('mouseover', function() {
                if (!isMoving) {
                    moveNoButton();
                }
            });
            
            function moveNoButton() {
                if (isMoving) return;
                
                isMoving = true;
                
                // Get container dimensions
                const containerRect = container.getBoundingClientRect();
                const btnRect = noBtn.getBoundingClientRect();
                
                // Calculate available space (considering button size)
                const maxX = containerRect.width - btnRect.width - 20;
                const maxY = containerRect.height - btnRect.height - 20;
                
                // Ensure minimum values
                const safeMaxX = Math.max(0, maxX);
                const safeMaxY = Math.max(0, maxY);
                
                const randomX = Math.floor(Math.random() * safeMaxX);
                const randomY = Math.floor(Math.random() * safeMaxY);
                
                // Move button to random position
                noBtn.style.position = 'absolute';
                noBtn.style.left = randomX + 'px';
                noBtn.style.top = randomY + 'px';
                
                // Change button text to a message from the array
                if (noClickCount < noMessages.length) {
                    noBtn.textContent = noMessages[noClickCount];
                    noClickCount++;
                } else {
                    // Reset to first message if we've gone through all
                    noClickCount = 0;
                    noBtn.textContent = noMessages[noClickCount];
                    noClickCount++;
                }
                
                // Reset moving flag after animation
                setTimeout(() => {
                    isMoving = false;
                }, 500);
            }
            
            // Function to create floating hearts for celebration
            function createFloatingHeart() {
                const heart = document.createElement('div');
                heart.innerHTML = '<i class="fas fa-heart"></i>';
                heart.style.position = 'fixed';
                heart.style.color = '#e91e63';
                heart.style.fontSize = Math.random() * 25 + 15 + 'px';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.top = '100vh';
                heart.style.opacity = '0.8';
                heart.style.zIndex = '9999';
                heart.style.pointerEvents = 'none';
                
                document.body.appendChild(heart);
                
                // Animation
                const animation = heart.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 0.8 },
                    { transform: `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                ], {
                    duration: Math.random() * 2000 + 1500,
                    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
                });
                
                // Remove heart after animation completes
                animation.onfinish = () => {
                    heart.remove();
                };
            }
            
            // Add some initial floating hearts
            setTimeout(() => {
                for (let i = 0; i < 3; i++) {
                    setTimeout(createFloatingHeart, i * 500);
                }
            }, 1000);
            
            // Prevent zoom on double tap (for mobile)
            let lastTouchEnd = 0;
            document.addEventListener('touchend', function(event) {
                const now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
        });