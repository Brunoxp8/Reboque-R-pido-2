/* Interações principais da página — mantidas em um único arquivo. */
(function () {
	'use strict';

	const $ = (selector, root = document) => root.querySelector(selector);
	const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

	function initMenu() {
		const toggle = $('[data-menu-toggle], .menu-toggle, .navbar-toggler');
		const menu = $('[data-menu], .menu, .navbar-collapse, nav ul');
		if (!toggle || !menu) return;

		toggle.addEventListener('click', () => {
			const open = menu.classList.toggle('is-open');
			toggle.classList.toggle('is-active', open);
			toggle.setAttribute('aria-expanded', String(open));
			menu.setAttribute('aria-hidden', String(!open));
		});

		$$('.menu a, .navbar-nav a, nav a').forEach((link) => {
			link.addEventListener('click', () => {
				menu.classList.remove('is-open');
				toggle.classList.remove('is-active');
				toggle.setAttribute('aria-expanded', 'false');
			});
		});
	}

	function initSmoothScroll() {
		$$('a[href^="#"]').forEach((link) => {
			link.addEventListener('click', (event) => {
				const target = $(link.getAttribute('href'));
				if (!target) return;
				event.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			});
		});
	}

	function initAccordions() {
		$$('[data-accordion], .accordion-button, .faq-question').forEach((button) => {
			button.addEventListener('click', () => {
				const item = button.closest('[data-accordion-item], .accordion-item, .faq-item') || button.parentElement;
				const content = item && $('.accordion-content, .faq-answer, [data-accordion-content]', item);
				if (!content) return;
				const open = item.classList.toggle('is-open');
				button.setAttribute('aria-expanded', String(open));
				content.hidden = !open;
			});
		});
	}

	function initPhoneLinks() {
		$$('a[href^="tel:"]').forEach((link) => {
			link.addEventListener('click', () => {
				if (typeof gtag === 'function') gtag('event', 'click_phone', { phone: link.href });
			});
		});
	}

	function init() {
		initMenu();
		initSmoothScroll();
		initAccordions();
		initPhoneLinks();
	}

	document.readyState === 'loading'
		? document.addEventListener('DOMContentLoaded', init)
		: init();
})();
