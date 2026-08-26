/* Interações principais da página — mantidas em um único arquivo. */
(function () {
	'use strict';

	const $ = (selector, root = document) => root.querySelector(selector);
	const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

	function setMenuState(toggle, menu, open) {
		menu.classList.toggle('is-open', open);
		toggle.classList.toggle('is-active', open);
		toggle.setAttribute('aria-expanded', String(open));
		menu.setAttribute('aria-hidden', String(!open));
	}

	function initMenu() {
		const toggles = $$('[data-menu-toggle], .menu-toggle, .navbar-toggler');
		const menus = $$('[data-menu], .menu, .navbar-collapse, nav ul');

		if (!toggles.length || !menus.length) return;

		const menu = menus[0];
		toggles.forEach((toggle) => {
			toggle.addEventListener('click', (event) => {
				event.preventDefault();
				const isOpen = !menu.classList.contains('is-open');
				setMenuState(toggle, menu, isOpen);
			});
		});

		$$('.menu a, .navbar-nav a, nav a').forEach((link) => {
			link.addEventListener('click', () => {
				toggles.forEach((toggle) => setMenuState(toggle, menu, false));
			});
		});
	}

	function initSmoothScroll() {
		$$('a[href^="#"]').forEach((link) => {
			const href = link.getAttribute('href');
			if (!href || href === '#') return;

			link.addEventListener('click', (event) => {
				const target = $(href);
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
				const open = !item.classList.contains('is-open');
				item.classList.toggle('is-open', open);
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

	function initOrderSubmit() {
		$$('form').forEach((form) => {
			form.addEventListener('submit', (event) => {
				const formData = new FormData(form);
				const entries = [];

				for (const [key, value] of formData.entries()) {
					const label = key.replace(/\[_-]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
					entries.push(`${label}: ${value}`);
				}

				if (!entries.length) return;

				event.preventDefault();
				const subject = encodeURIComponent('Novo pedido');
				const body = encodeURIComponent(`Informações do pedido:\n\n${entries.join('\n')}`);
				window.location.href = `mailto:brodgemmvj@gmail.com?subject=${subject}&body=${body}`;
			});
		});
	}

	function init() {
		initMenu();
		initSmoothScroll();
		initAccordions();
		initPhoneLinks();
		initOrderSubmit();
	}

	document.readyState === 'loading'
		? document.addEventListener('DOMContentLoaded', init)
		: init();
})();
