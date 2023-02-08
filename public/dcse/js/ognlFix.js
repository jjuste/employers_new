/**
 * 
 */

/**
 * Replaces the #index in iterated tags since OGNL cannot be used to do it correctly. 
 * 
 * Requirements
 * -jQuery
 * -iterated tag with an id
 * -descendant tag with attribute containing #index
 * 
 * To correctly use this, the iterated parent tag needs to have an id that starts with a specific term or phrase. 
 * You also need to provide the attribute to look for that has #index in it.
 * 
 * @param idStart the start of the id
 * @param attribute what attribute to look for. Typically id or name.
 * @returns
 */
function fixIds(idStart, attribute) {
	$('[id^=' + idStart + ']').each(function (index, thing) {
		$(thing).find('[' + attribute + '*="#index"]').each(function (tagIndex, tag) {
			tag.id && (tag.id = tag.id.replace("#index", index));
			tag.name && (tag.name = tag.name.replace("#index", index));
		});
	});
};