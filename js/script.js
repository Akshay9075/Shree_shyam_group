const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#navLinks');
const dropTrigger = document.querySelector('.drop-trigger');
const navDropdown = document.querySelector('.nav-dropdown');

if (menuToggle && navLinks) {
	menuToggle.addEventListener('click', () => {
		navLinks.classList.toggle('open');
		const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
		menuToggle.setAttribute('aria-expanded', String(!expanded));
	});
}

if (dropTrigger && navDropdown) {
	dropTrigger.addEventListener('click', () => {
		navDropdown.classList.toggle('open');
	});

	document.addEventListener('click', (event) => {
		if (!navDropdown.contains(event.target)) {
			navDropdown.classList.remove('open');
		}
	});
}

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('show');
			revealObserver.unobserve(entry.target);
		}
	});
}, {
	threshold: 0.2
});

revealElements.forEach((element) => revealObserver.observe(element));

const parallaxElements = document.querySelectorAll('.hero, .page-banner');
let isParallaxTicking = false;

const updateParallax = () => {
	const scrollY = window.scrollY || window.pageYOffset;
	parallaxElements.forEach((element) => {
		element.classList.add('scroll-parallax');
		const elementTop = element.getBoundingClientRect().top + scrollY;
		const travel = (scrollY - elementTop) * 0.08;
		const clampedTravel = Math.max(-18, Math.min(18, travel));
		element.style.setProperty('--parallax-y', `${clampedTravel}px`);
	});
	isParallaxTicking = false;
};

if (parallaxElements.length) {
	updateParallax();
	window.addEventListener('scroll', () => {
		if (!isParallaxTicking) {
			window.requestAnimationFrame(updateParallax);
			isParallaxTicking = true;
		}
	}, { passive: true });
}

const scrollAnimatedElements = document.querySelectorAll('.card, .value-item, .process-card, .timeline-item, .about-highlight-item');

if (scrollAnimatedElements.length) {
	const elementObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('in-view');
				elementObserver.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.12,
		rootMargin: '0px 0px -40px 0px'
	});

	scrollAnimatedElements.forEach((element, index) => {
		element.classList.add('scroll-animate-item');
		element.style.transitionDelay = `${Math.min(index % 6, 3) * 0.08}s`;
		elementObserver.observe(element);
	});
}

const backToTopButton = document.querySelector('.fab-top');

if (backToTopButton) {
	const toggleBackToTop = () => {
		if (window.scrollY > 260) {
			backToTopButton.classList.add('show');
		} else {
			backToTopButton.classList.remove('show');
		}
	};

	toggleBackToTop();
	window.addEventListener('scroll', toggleBackToTop, { passive: true });

	backToTopButton.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
}
