const categories = [
  'phim-hanh-dong',
  'phim-hai-huoc',
  'phim-co-trang',
  'phim-chinh-kich-drama',
  'phim-vien-tuong',
  'phim-vo-thuat',
  'phim-than-thoai',
  'phim-the-thao-am-nhac',
  'phim-chien-tranh',
  'phim-kinh-di',
  'phim-tam-ly',
  'phim-gia-dinh',
  'phim-hinh-su',
  'phim-hoi-hop-gay-can',
  'phim-tai-lieu',
  'phim-hoat-hinh',
  'phim-phieu-luu',
  'phim-bi-an-sieu-nhien',
  'phim-tinh-cam-lang-mang'
]

const countries = [
  'vn',
  'jp',
  'fr',
  'ca',
  'cn',
  'hk',
  'tw',
  '',
  'us',
  'in',
  'au',
  'kr',
  'th',
  'uk'
]

const years = [
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '-2014' // < 2014
]

exports.types = {
  'the-loai': categories,
  'quoc-gia': countries,
  'phim-bo': countries,
  'phim-le': years
}
