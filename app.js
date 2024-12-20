$(document).ready(function () {
    // Basic navbar functionality
    function initNavbar() {
        const navbar = $('.navbar');
        const hamburger = $('.hamburger');
        const menuItems = $('.menu-items');
        const navLinks = $('.menu-items a');
        
        // Hamburger menu click
        hamburger.click(function() {
            hamburger.toggleClass('active');
            menuItems.toggleClass('active');
            $('body').toggleClass('menu-open');
        });
        
        // Handle menu item clicks
        navLinks.click(function(e) {
            e.preventDefault();
            const target = $($(this).attr('href'));
            
            // Remove active classes
            hamburger.removeClass('active');
            menuItems.removeClass('active');
            $('body').removeClass('menu-open');
            
            // Update active link
            navLinks.removeClass('active');
            $(this).addClass('active');
            
            // Smooth scroll to section
            if (target.length) {
                const offset = navbar.outerHeight() + 20;
                const targetPosition = target.offset().top - offset;
                
                $('html, body').animate({
                    scrollTop: targetPosition
                }, 800);
            }
        });

        // Close menu when clicking outside
        $(document).click(function(e) {
            if (!$(e.target).closest('.navbar').length) {
                hamburger.removeClass('active');
                menuItems.removeClass('active');
                $('body').removeClass('menu-open');
            }
        });

        // Prevent clicks inside menu from closing it
        $('.nav-wrapper').click(function(e) {
            e.stopPropagation();
        });
    }

    // Theme toggle functionality
    function initTheme() {
        const themeToggle = $('.theme-toggle');
        const body = $('body');
        const icon = themeToggle.find('i');
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        body.attr('data-theme', savedTheme);
        updateThemeIcon(savedTheme === 'dark');

        // Theme toggle click handler
        themeToggle.click(function() {
            const isDark = body.attr('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            
            // Animate icon rotation
            $(this).addClass('rotate');
            setTimeout(() => $(this).removeClass('rotate'), 300);
            
            // Update theme
            body.attr('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(!isDark);
        });

        function updateThemeIcon(isDark) {
            icon.removeClass('fa-sun fa-moon')
                .addClass(isDark ? 'fa-sun' : 'fa-moon');
        }
    }

    // Initialize
    initNavbar();
    initTheme();

    const educationData = {
        'btech': {
            title: 'BCA in Computer Application',
            institution: 'PMN (Patel Memorial National College)',
            duration: '2024 - Present',
            grade: 'Currently Pursuing',
            location: 'Rajpura, Punjab',
            achievements: [
                'First Year Student',
                'Active member of Coding Club',
                'Participated in various coding competitions',
                'Learning web development and programming'
            ],
            certificate: 'https://placehold.co/600x400/2563eb/ffffff?text=Certificate+Coming+Soon'
        },
        'highschool': {
            title: 'Higher Secondary Education',
            institution: 'Govt. Sen. Sec. School Uksi Sainian',
            duration: '2022 - 2024',
            grade: '95% Aggregate',
            location: 'Uksi Sainian, Punjab',
            achievements: [
                'School topper in Computer Science',
                'Participated in Science exhibitions',
                'Member of School\'s Tech Club'
            ],
            certificate: 'https://placehold.co/600x400/2563eb/ffffff?text=12th+Certificate'
        },
        'secondary': {
            title: 'Secondary Education',
            institution: 'Govt. High School Upalheri',
            duration: '2020 - 2022',
            grade: '92% Aggregate',
            location: 'Upalheri, Punjab',
            achievements: [
                'School rank holder',
                'Active participation in academic activities',
                'Excellence in Mathematics and Science'
            ],
            certificate: 'https://placehold.co/600x400/2563eb/ffffff?text=10th+Certificate'
        }
    };

    // Modal functionality
    $(document).ready(function() {
        $('.view-details').click(function() {
            const educationType = $(this).data('education');
            const data = educationData[educationType];
            if (data) {
                showEducationModal(data);
            }
        });

        $('.close-modal, .modal').click(function(e) {
            if (e.target === this) {
                closeEducationModal();
            }
        });

        function showEducationModal(data) {
            const modal = $('#educationModal');
            
            // Update modal content
            modal.find('.modal-header h2').text(data.title);
            modal.find('.modal-header h3').text(data.institution);
            
            // Update details
            modal.find('.detail-row:nth-child(1) .value').text(data.duration);
            modal.find('.detail-row:nth-child(2) .value').text(data.grade);
            modal.find('.detail-row:nth-child(3) .value').text(data.location);
            
            // Update achievements
            const achievementsList = modal.find('.achievements .value');
            achievementsList.empty();
            data.achievements.forEach(achievement => {
                achievementsList.append(`<li>${achievement}</li>`);
            });
            
            // Update certificate section
            const certificateSection = modal.find('.certificate-preview');
            if (data.certificate) {
                certificateSection.show();
                certificateSection.find('img').attr('src', data.certificate);
                certificateSection.find('.view-certificate').attr('href', data.certificate);
            } else {
                certificateSection.hide();
            }
            
            // Show modal
            modal.addClass('show');
            $('body').addClass('modal-open');
        }

        function closeEducationModal() {
            const modal = $('#educationModal');
            modal.removeClass('show');
            $('body').removeClass('modal-open');
        }
    });

    const skillsData = {
        'html': {
            name: 'HTML5',
            icon: 'fab fa-html5',
            proficiency: '90%',
            experience: '2 years of experience in creating semantic and accessible HTML structures.',
            projects: [
                'Created responsive websites',
                'Developed landing pages',
                'Built forms with validation',
                'Implemented SEO best practices'
            ]
        },
        'css': {
            name: 'CSS3',
            icon: 'fab fa-css3-alt',
            proficiency: '85%',
            experience: '2 years of experience in styling and creating responsive layouts.',
            projects: [
                'Implemented responsive designs',
                'Created animations and transitions',
                'Built custom components',
                'Developed mobile-first layouts'
            ]
        },
        'javascript': {
            name: 'JavaScript',
            icon: 'fab fa-js',
            proficiency: '75%',
            experience: '1.5 years of experience in frontend development with JavaScript.',
            projects: [
                'Built interactive web applications',
                'Implemented form validation',
                'Created dynamic UI components',
                'Developed AJAX functionality'
            ]
        },
        'python': {
            name: 'Python',
            icon: 'fab fa-python',
            proficiency: '80%',
            experience: '1 year of experience in Python programming.',
            projects: [
                'Developed automation scripts',
                'Created data analysis tools',
                'Built backend APIs',
                'Implemented machine learning models'
            ]
        }
    };

    // Skill Modal Functionality
    $(document).ready(function() {
        $('.view-skill-details').click(function() {
            const skillCard = $(this).closest('.skill-card');
            const skillType = skillCard.data('skill');
            const data = skillsData[skillType];
            
            if (data) {
                showSkillModal(data);
            }
        });

        function showSkillModal(data) {
            const modal = $('#skillModal');
            
            // Update modal content
            modal.find('.modal-header h2').text(data.name);
            modal.find('.skill-icon').html(`<i class="${data.icon}"></i>`);
            
            // Update proficiency
            const progressBar = modal.find('.progress');
            progressBar.css('width', '0');
            progressBar.attr('data-percentage', data.proficiency);
            setTimeout(() => progressBar.css('width', data.proficiency), 100);
            
            // Update experience
            modal.find('.experience-text').text(data.experience);
            
            // Update projects
            const projectsList = modal.find('.projects-list');
            projectsList.empty();
            data.projects.forEach(project => {
                projectsList.append(`<li>${project}</li>`);
            });
            
            // Show modal
            modal.addClass('show');
            $('body').addClass('modal-open');
        }

        // Close modal handlers
        $('.close-modal, .modal').click(function(e) {
            if (e.target === this) {
                closeSkillModal();
            }
        });

        function closeSkillModal() {
            $('#skillModal').removeClass('show');
            $('body').removeClass('modal-open');
        }
    });

    function initImageSlider() {
        const sliderContainer = $('.slider-container');
        const images = $('.profile-img');
        const dots = $('.dot');
        const prevBtn = $('.prev-btn');
        const nextBtn = $('.next-btn');
        let currentIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;

        // Show initial image
        showImage(0);

        function showImage(index) {
            images.removeClass('active');
            dots.removeClass('active');
            
            $(images[index]).addClass('active');
            $(dots[index]).addClass('active');
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }

        // Event listeners
        nextBtn.click(nextImage);
        prevBtn.click(prevImage);
        
        dots.each(function(index) {
            $(this).click(function() {
                currentIndex = index;
                showImage(currentIndex);
            });
        });

        // Touch events for mobile swipe
        sliderContainer.on('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
        });

        sliderContainer.on('touchend', function(e) {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    prevImage();
                } else {
                    nextImage();
                }
            }
        }

        // Auto slide every 5 seconds
        let autoSlide = setInterval(nextImage, 5000);

        // Pause auto slide on hover or touch
        sliderContainer.hover(
            function() { clearInterval(autoSlide); },
            function() { autoSlide = setInterval(nextImage, 5000); }
        );

        sliderContainer.on('touchstart', function() {
            clearInterval(autoSlide);
        });

        sliderContainer.on('touchend', function() {
            autoSlide = setInterval(nextImage, 5000);
        });
    }

    // Add this to your initialization
    $(document).ready(function() {
        // ... your existing code ...
        initImageSlider();
        initTypedText();
        initScrollIndicator();
    });

    // Add this to your existing JavaScript
    function initTypedText() {
        const options = {
            strings: [
                'Web Developer',
                'Frontend Developer',
                'Python Developer',
                'UI Designer'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            smartBackspace: true
        };

        new Typed('#typed-text', options);
    }

    // Scroll Progress Indicator
    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = (scrollTop / docHeight) * 100;
        $('.scroll-progress-bar').css('width', scrollPercent + '%');
    });

    // Copy Email Feature
    $('.copy-email').click(function() {
        const email = $(this).find('span').text();
        navigator.clipboard.writeText(email).then(() => {
            const tooltip = $(this).find('.tooltip');
            tooltip.addClass('show').text('Email copied!');
            
            setTimeout(() => {
                tooltip.removeClass('show');
            }, 2000);
        });
    });

    // Add this to your existing JavaScript
    function initScrollIndicator() {
        const scrollIndicator = $('.scroll-indicator');
        const homeContent = $('.home-content');

        // Show/hide scroll indicator based on scroll position
        $(window).scroll(function() {
            if ($(window).scrollTop() > 100) {
                scrollIndicator.fadeOut();
            } else {
                scrollIndicator.fadeIn();
            }
        });

        // Smooth scroll when clicking the indicator
        scrollIndicator.click(function() {
            const nextSection = homeContent.next('section');
            if (nextSection.length) {
                const offset = $('.navbar').outerHeight() + 20;
                $('html, body').animate({
                    scrollTop: nextSection.offset().top - offset
                }, 800, 'easeInOutQuad');
            }
        });

        // Add bounce animation on hover
        scrollIndicator.hover(
            function() {
                $(this).css('animation-play-state', 'paused');
            },
            function() {
                $(this).css('animation-play-state', 'running');
            }
        );
    }
});