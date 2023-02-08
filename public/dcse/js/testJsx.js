const Thing = () => {
	<div>
		<h2>I'm a Thing</h2>
		<p>I have content and can use tags.</p>
	</div>
}

document.getElementById('thing').appendChild(<Thing/>)