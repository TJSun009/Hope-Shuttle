import gtfsToHtml from 'gtfs-to-html';
import { readFile } from 'fs/promises';

const config = JSON.parse(
	await readFile('/home/runner/App/public/gtfs-to-html/config.json')
);

export default () => {
	gtfsToHtml(config)
		.then(() => {
			console.log('HTML Generation Successful');
			return;
		})
		.catch((err) => {
			console.error(err);
			return;
		});
}