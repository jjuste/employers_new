function autoTab(input, maxlen, e) {
	if (input.value.length == maxlen) {
		input.form[(getIndex(input) + 1) % input.form.length].focus();
	}
}

function getIndex(input) {
	var index = -1,
		i = 0,
		found = false;
	while (i < input.form.length && index == -1) {
		if (input.form[i] == input) index = i;
		else i++;
	}
	return index;
}