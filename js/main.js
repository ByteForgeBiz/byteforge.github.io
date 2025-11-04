/**
 * ByteForge Main JavaScript
 * Handles interactivity, animations, and dynamic features
 */

(function($) {
    'use strict';
    
    // Initialize when DOM is ready
    $(document).ready(function() {
        initSmoothScrolling();
        initTypedAnimation();
        initAOS();
        initScrollToTop();
        initThemeToggle();
        initCollapseToggle();
        initNavbarActiveState();
        initParallaxEffect();
        initNoJSFallback();
    });
    
    /**
     * Smooth Scrolling for Navigation Links
     */
    function initSmoothScrolling() {
        // Handle all internal anchor links
        $('a[href^="#"]').on('click', function(e) {
            const target = $(this.hash);
            
            if (target.length) {
                e.preventDefault();
                
                // Close mobile menu if open
                $('.navbar-collapse').collapse('hide');
                
                // Smooth scroll with offset for fixed navbar
                const navHeight = $('#mainNav').outerHeight();
                const scrollTo = target.offset().top - navHeight - 20;
                
                $('html, body').animate({
                    scrollTop: scrollTo
                }, 800, 'swing', function() {
                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, e.target.hash);
                    }
                });
            }
        });
    }
    
    /**
     * Typed.js Animation for Hero Text
     */
    function initTypedAnimation() {
        if (typeof Typed !== 'undefined') {
            const typed = new Typed('#typed-text', {
                strings: [
                    'Engineering the Future.',
                    'Building Tomorrow.',
                    'Innovation Delivered.',
                    'ByteForge.'
                ],
                typeSpeed: 60,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                cursorChar: '_',
                smartBackspace: true
            });
        } else {
            // Fallback if Typed.js fails to load
            $('#typed-text').text('Engineering the Future.');
        }
    }
    
    /**
     * Initialize AOS (Animate On Scroll)
     */
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
                disable: function() {
                    // Disable on mobile for performance
                    return window.innerWidth < 768;
                }
            });
            
            // Refresh AOS on window resize
            let resizeTimer;
            $(window).on('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    AOS.refresh();
                }, 250);
            });
        }
    }
    
    /**
     * Scroll to Top Button
     */
    function initScrollToTop() {
        const $scrollBtn = $('#scrollTop');
        
        // Show/hide button based on scroll position
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 500) {
                $scrollBtn.css('display', 'flex').fadeIn();
            } else {
                $scrollBtn.fadeOut();
            }
        });
        
        // Scroll to top on click
        $scrollBtn.on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800, 'swing');
            return false;
        });
    }
    
    /**
     * Dark/Light Theme Toggle
     */
    function initThemeToggle() {
        const $toggle = $('#themeToggle');
        const $html = $('html');
        const $icon = $toggle.find('i');
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        $html.attr('data-bs-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        // Toggle theme on click
        $toggle.on('click', function() {
            const currentTheme = $html.attr('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Apply theme with transition
            $html.attr('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Refresh AOS for theme change
            if (typeof AOS !== 'undefined') {
                setTimeout(() => AOS.refresh(), 300);
            }
        });
        
        function updateThemeIcon(theme) {
            if (theme === 'dark') {
                $icon.removeClass('bi-sun-fill').addClass('bi-moon-fill');
            } else {
                $icon.removeClass('bi-moon-fill').addClass('bi-sun-fill');
            }
        }
    }
    
    /**
     * Collapse Button Toggle Text
     */
    function initCollapseToggle() {
        $('#moreInfo').on('show.bs.collapse', function() {
            const $btn = $('[data-bs-target="#moreInfo"]');
            $btn.find('.toggle-text').text('Show Less');
            $btn.find('i').removeClass('bi-chevron-down').addClass('bi-chevron-up');
        });
        
        $('#moreInfo').on('hide.bs.collapse', function() {
            const $btn = $('[data-bs-target="#moreInfo"]');
            $btn.find('.toggle-text').text('Learn More');
            $btn.find('i').removeClass('bi-chevron-up').addClass('bi-chevron-down');
        });
    }
    
    /**
     * Update Active Navigation State on Scroll
     */
    function initNavbarActiveState() {
        const sections = $('section[id], header[id]');
        const navLinks = $('.navbar-nav .nav-link');
        const navHeight = $('#mainNav').outerHeight();
        
        $(window).on('scroll', function() {
            const scrollPos = $(window).scrollTop() + navHeight + 50;
            
            sections.each(function() {
                const $section = $(this);
                const sectionTop = $section.offset().top;
                const sectionBottom = sectionTop + $section.outerHeight();
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    const sectionId = $section.attr('id');
                    
                    navLinks.removeClass('active');
                    navLinks.filter(`[href="#${sectionId}"]`).addClass('active');
                }
            });
        });
    }
    
    /**
     * Parallax Effect for Hero Section
     */
    function initParallaxEffect() {
        if (window.innerWidth > 768) {
            $(window).on('scroll', function() {
                const scrolled = $(window).scrollTop();
                const parallaxSpeed = 0.5;
                
                // Apply parallax to hero content
                $('.hero-content').css({
                    'transform': `translateY(${scrolled * parallaxSpeed}px)`,
                    'opacity': 1 - (scrolled / 800)
                });
                
                // Parallax for particles
                $('.particle').each(function(index) {
                    const speed = 0.2 * (index + 1);
                    $(this).css({
                        'transform': `translateY(${scrolled * speed}px)`
                    });
                });
            });
        }
    }
    
    /**
     * No-JS Fallback Detection
     */
    function initNoJSFallback() {
        // Remove no-js class if JavaScript is enabled
        $('html').removeClass('no-js');
        
        // Add loading state handling
        $(window).on('load', function() {
            $('body').addClass('loaded');
        });
    }
    
    /**
     * Additional Interactive Features
     */
    
    // Navbar shrink on scroll
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $('#mainNav').addClass('navbar-shrink');
        } else {
            $('#mainNav').removeClass('navbar-shrink');
        }
    });
    
    // Project card hover effects with mouse tracking
    $('.project-card').on('mousemove', function(e) {
        const $card = $(this);
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        $card.css({
            'transform': `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
        });
    });
    
    $('.project-card').on('mouseleave', function() {
        $(this).css({
            'transform': 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
        });
    });
    
    // Preloader (optional)
    $(window).on('load', function() {
        // Hide preloader if it exists
        if ($('#preloader').length) {
            $('#preloader').fadeOut('slow', function() {
                $(this).remove();
            });
        }
    });
    
    // Console Easter Egg
    console.log('%c ByteForge ', 
        'background: linear-gradient(135deg, #45a29e, #66fcf1); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Engineering the Future 🚀', 
        'color: #66fcf1; font-size: 14px; font-weight: bold;');
    console.log('%c Interested in joining us? Email: careers@byteforge.biz', 
        'color: #45a29e; font-size: 12px;');
    
    // Performance monitoring
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        });
    }
    
})(jQuery);

// Service Worker Registration (optional for PWA support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('sw.js');
    });
}