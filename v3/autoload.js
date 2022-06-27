const live2d_path = 'https://cdn.jsdelivr.net/gh/Flysky12138/live2d/v3/'

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag
		if (type === 'css') {
			tag = document.createElement('link')
			tag.rel = 'stylesheet'
			tag.href = url
		} else if (type === 'js') {
			tag = document.createElement('script')
			tag.src = url
		}
		if (tag) {
			tag.onload = () => resolve(url)
			tag.onerror = () => reject(url)
			document.head.appendChild(tag)
		}
	})
}

document.body.insertAdjacentHTML(
	'beforeend',
	`<div id="waifu" style="left: 0">
		<div class="waifu-tips"></div>
		<canvas id="live2d"></canvas>
	</div>`
)

// 加载js css
if (screen.width >= 500) {
	Promise.all([
		loadExternalResource('https://cdn.jsdelivr.net/npm/jquery@3.5.0/dist/jquery.min.js', 'js'),
		loadExternalResource(live2d_path + '../waifu/waifu-tips.js', 'js'),
		loadExternalResource(live2d_path + '../waifu/waifu.css', 'css')
	])
		.then(async () => {
			await loadExternalResource(live2d_path + 'assets/pixi.min.js', 'js')
			await loadExternalResource(live2d_path + 'assets/live2dcubismpixi.js', 'js')
			await loadExternalResource(live2d_path + 'assets/live2dcubismcore.min.js', 'js')
			await loadExternalResource(live2d_path + 'assets/live2dcubismframework.js', 'js')
			await loadExternalResource(live2d_path + 'loadModel.js', 'js')

			// canvas
			const live2d = {
				baseModelPath: live2d_path + 'model/',
				modelNames: ['xuefeng_3'],
				tag_target: '#waifu',
				model_x: 40,
				model_y: 0,
				modelWidth: 320,
				modelHight: 400,
				scale: 26
			}
			// 文字气泡
			const callback = loadTips.bind(null, {
				cycleTime: 30 * 1000,
				waifu_target: '.waifu-tips',
				waifu_tips: live2d_path + '../waifu/waifu-tips.json'
			})

			new loadModel(live2d, callback)
		})
		.catch(() => {
			console.log('[Error] Something failed to download.')
		})
}

console.log(`
  く__,.ヘヽ.        /  ,ー､ 〉
           ＼ ', !-─‐-i  /  /´
           ／｀ｰ'       L/／｀ヽ､
         /   ／,   /|   ,   ,       ',
       ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
          !,/7 '0'     ´0iソ|    |
          |.从"    _     ,,,, / |./    |
          ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
              | |/i 〈|/   i  ,.ﾍ |  i  |
             .|/ /  ｉ：    ﾍ!    ＼  |
              kヽ>､ﾊ    _,.ﾍ､    /､!
              !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
              ﾚ'ヽL__|___i,___,ンﾚ|ノ
                  ﾄ-,/  |___./
                  'ｰ'    !_,.:
`)
