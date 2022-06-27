const live2d_path = 'https://cdn.jsdelivr.net/gh/Flysky12138/live2d/v2/'

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
		<canvas id="live2d" height="800" style="height: 600px;margin: -55px 0;"></canvas>
	</div>`
)

// 加载js css
if (screen.width >= 500) {
	Promise.all([
		loadExternalResource('https://cdn.jsdelivr.net/npm/jquery@3.5.0/dist/jquery.min.js', 'js'),
		loadExternalResource(live2d_path + 'assets/live2d.js', 'js'),
		loadExternalResource(live2d_path + '../waifu/waifu-tips.js', 'js'),
		loadExternalResource(live2d_path + '../waifu/waifu.css', 'css')
	])
		.then(() => {
			loadlive2d('live2d', live2d_path + 'model/l_103300401/model.json')
			loadTips({
				cycleTime: 30 * 1000,
				waifu_target: '.waifu-tips',
				waifu_tips: live2d_path + '../waifu/waifu-tips.json'
			})
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
