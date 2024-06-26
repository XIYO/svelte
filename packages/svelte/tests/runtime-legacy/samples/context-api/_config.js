import { test } from '../../test';

export default test({
	compileOptions: {
		dev: true // to ensure dev mode does not break context in some way
	},
	html: `
		<div class="tabs">
			<div class="tab-list">
				<button class="selected">small</button>
				<button>large</button>
			</div>

			<h2>Small panel</h2>
		</div>
	`,

	async test({ assert, component, target, window }) {
		const click = new window.MouseEvent('click', { bubbles: true });
		let buttons = target.querySelectorAll('button');

		await buttons[1].dispatchEvent(click);

		assert.htmlEqual(
			target.innerHTML,
			`
			<div class="tabs">
				<div class="tab-list">
					<button class="">small</button>
					<button class="selected">large</button>
				</div>

				<h2>Large panel</h2>
			</div>
		`
		);

		component.show_medium = true;

		assert.htmlEqual(
			target.innerHTML,
			`
			<div class="tabs">
				<div class="tab-list">
					<button class="">small</button>
					<button>medium</button>
					<button class="selected">large</button>
				</div>

				<h2>Large panel</h2>
			</div>
		`
		);

		buttons = target.querySelectorAll('button');

		await buttons[1].dispatchEvent(click);

		assert.htmlEqual(
			target.innerHTML,
			`
			<div class="tabs">
				<div class="tab-list">
					<button class="">small</button>
					<button class="selected">medium</button>
					<button class="">large</button>
				</div>

				<h2>Medium panel</h2>
			</div>
		`
		);

		component.show_medium = false;

		assert.htmlEqual(
			target.innerHTML,
			`
			<div class="tabs">
				<div class="tab-list">
					<button class="">small</button>
					<button class="selected">large</button>
				</div>

				<h2>Large panel</h2>
			</div>
		`
		);
	}
});
