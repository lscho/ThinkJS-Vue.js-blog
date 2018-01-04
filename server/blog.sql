
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- 表的结构 `ls_content`
--

CREATE TABLE `ls_content` (
  `id` int(10) NOT NULL,
  `title` varchar(200) NOT NULL,
  `uid` int(10) NOT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `category_id` int(10) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  `description` text,
  `markdown` text,
  `content` text,
  `create_time` int(10) NOT NULL,
  `view` int(10) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `ls_content`
--

INSERT INTO `ls_content` (`id`, `title`, `uid`, `slug`, `category_id`, `status`, `description`, `markdown`, `content`, `create_time`, `view`) VALUES
(1, '关于', 1, 'about', 2, 1, '', '从小爱做梦\n\n天上飞的，海里游的，穿越的，抗战的，武侠的，爱情的，不可描述的。。。各种梦\n\n能记下来百不存一。\n\n取名梦游计。\n\n以后将梦都记在这里。', '<p>从小爱做梦</p>\n<p>天上飞的，海里游的，穿越的，抗战的，武侠的，爱情的，不可描述的。。。各种梦</p>\n<p>能记下来百不存一。</p>\n<p>取名梦游计。</p>\n<p>以后将梦都记在这里。</p>\n', 1513828470, 10),
(3, '文本测试', 1, 'txt', 1, 99, '<p>梦到去买豆浆机</p>\n<p>巨大的一个豆浆机，得有磨盘那么大</p>\n<p>感觉买回来能开个卖早餐的店了，一个豆浆机磨一次能卖几十杯。</p>\n', '梦到去买豆浆机\n\n巨大的一个豆浆机，得有磨盘那么大\n\n感觉买回来能开个卖早餐的店了，一个豆浆机磨一次能卖几十杯。\n\n<!--more-->\n\n一杯卖三块，感觉马上成首富', '<p>梦到去买豆浆机</p>\n<p>巨大的一个豆浆机，得有磨盘那么大</p>\n<p>感觉买回来能开个卖早餐的店了，一个豆浆机磨一次能卖几十杯。</p>\n<!--more-->\n<p>一杯卖三块，感觉马上成首富</p>\n', 1514027513, 1),
(4, '图文测试', 1, 'image-text', 2, 99, '<p><img src=\"/upload/05f4548ec063a492663104f17c858258.jpg\" alt=\"809120196.jpg\" /></p>\n<p>图文测试</p>\n', '\n![809120196.jpg](/upload/05f4548ec063a492663104f17c858258.jpg)\n\n图文测试\n<!--more-->', '', 1514027682, 1),
(6, '代码测试', 1, 'code', 2, 99, '<pre><div class=\"hljs\"><code class=\"lang-javascript\">axios.interceptors.request.use(<span class=\"hljs-function\"><span class=\"hljs-params\">config</span> =&gt;</span> {\n	<span class=\"hljs-comment\">//token</span>\n	<span class=\"hljs-keyword\">if</span> (localStorage.getItem(<span class=\"hljs-string\">\'token\'</span>)) {\n		config.headers.Authorization = localStorage.getItem(<span class=\"hljs-string\">\'token\'</span>)\n	}\n	<span class=\"hljs-keyword\">return</span> config;\n}, error =&gt; {\n	Message.error(<span class=\"hljs-string\">\'请求服务器超时\'</span>);\n	<span class=\"hljs-keyword\">return</span> error;\n})\n</code></div></pre>\n', '```javascript\naxios.interceptors.request.use(config => {\n	//token\n	if (localStorage.getItem(\'token\')) {\n		config.headers.Authorization = localStorage.getItem(\'token\')\n	}\n	return config;\n}, error => {\n	Message.error(\'请求服务器超时\');\n	return error;\n})\n```\n\n<!--more-->\n\n({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });\n\nobj // {prop:123}\narr // [true]\n对象的解构也可以指定默认值。\n```javascript\nvar {x = 3} = {};\nx // 3\n\nvar {x, y = 5} = {x: 1};\nx // 1\ny // 5\n\nvar {x: y = 3} = {};\ny // 3\n\nvar {x: y = 3} = {x: 5};\ny // 5\n```\nvar { message: msg = \'Something went wrong\' } = {};\nmsg // \"Something went wrong\"\n默认值生效的条件是，对象的属性值严格等于undefined。\n\nvar {x = 3} = {x: undefined};\nx // 3\n\nvar {x = 3} = {x: null};\nx // null\n上面代码中，如果x属性等于null，就不严格相等于undefined，导致默认值不会生效。\n\n如果解构失败，变量的值等于undefined。', '<pre><div class=\"hljs\"><code class=\"lang-javascript\">axios.interceptors.request.use(<span class=\"hljs-function\"><span class=\"hljs-params\">config</span> =&gt;</span> {\n	<span class=\"hljs-comment\">//token</span>\n	<span class=\"hljs-keyword\">if</span> (localStorage.getItem(<span class=\"hljs-string\">\'token\'</span>)) {\n		config.headers.Authorization = localStorage.getItem(<span class=\"hljs-string\">\'token\'</span>)\n	}\n	<span class=\"hljs-keyword\">return</span> config;\n}, error =&gt; {\n	Message.error(<span class=\"hljs-string\">\'请求服务器超时\'</span>);\n	<span class=\"hljs-keyword\">return</span> error;\n})\n</code></div></pre>\n<!--more-->\n<p>({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });</p>\n<p>obj // {prop:123}<br />\narr // [true]<br />\n对象的解构也可以指定默认值。</p>\n<pre><div class=\"hljs\"><code class=\"lang-javascript\"><span class=\"hljs-keyword\">var</span> {x = <span class=\"hljs-number\">3</span>} = {};\nx <span class=\"hljs-comment\">// 3</span>\n\n<span class=\"hljs-keyword\">var</span> {x, y = <span class=\"hljs-number\">5</span>} = {<span class=\"hljs-attr\">x</span>: <span class=\"hljs-number\">1</span>};\nx <span class=\"hljs-comment\">// 1</span>\ny <span class=\"hljs-comment\">// 5</span>\n\n<span class=\"hljs-keyword\">var</span> {<span class=\"hljs-attr\">x</span>: y = <span class=\"hljs-number\">3</span>} = {};\ny <span class=\"hljs-comment\">// 3</span>\n\n<span class=\"hljs-keyword\">var</span> {<span class=\"hljs-attr\">x</span>: y = <span class=\"hljs-number\">3</span>} = {<span class=\"hljs-attr\">x</span>: <span class=\"hljs-number\">5</span>};\ny <span class=\"hljs-comment\">// 5</span>\n</code></div></pre>\n<p>var { message: msg = ‘Something went wrong’ } = {};<br />\nmsg // &quot;Something went wrong&quot;<br />\n默认值生效的条件是，对象的属性值严格等于undefined。</p>\n<p>var {x = 3} = {x: undefined};<br />\nx // 3</p>\n<p>var {x = 3} = {x: null};<br />\nx // null<br />\n上面代码中，如果x属性等于null，就不严格相等于undefined，导致默认值不会生效。</p>\n<p>如果解构失败，变量的值等于undefined。</p>\n', 1514108654, 4);

-- --------------------------------------------------------

--
-- 表的结构 `ls_meta`
--

CREATE TABLE `ls_meta` (
  `id` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `type` varchar(10) NOT NULL,
  `count` int(10) DEFAULT '0',
  `sort` int(10) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `ls_meta`
--

INSERT INTO `ls_meta` (`id`, `uid`, `name`, `slug`, `description`, `type`, `count`, `sort`) VALUES
(1, 1, '生活', 'life', '1122', 'category', 0, 0),
(2, 1, '代码', 'code', '2', 'category', 0, 0),
(6, 1, 'php', 'php', '', 'tag', 0, 0),
(7, 1, 'nodejs', 'nodejs', '', 'tag', 0, 0),
(8, 1, '', NULL, NULL, '', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `ls_relationships`
--

CREATE TABLE `ls_relationships` (
  `content_id` int(10) NOT NULL,
  `meta_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `ls_relationships`
--

INSERT INTO `ls_relationships` (`content_id`, `meta_id`) VALUES
(2, 6),
(2, 7),
(2, 6),
(2, 7),
(5, 6),
(5, 7),
(1, 6),
(1, 6),
(1, 7),
(1, 7),
(4, 6),
(4, 7),
(4, 6),
(4, 7),
(6, 6),
(6, 7);

-- --------------------------------------------------------

--
-- 表的结构 `ls_site`
--

CREATE TABLE `ls_site` (
  `id` int(10) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `footer` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `ls_site`
--

INSERT INTO `ls_site` (`id`, `title`, `description`, `url`, `footer`) VALUES
(1, '梦游计', '爱做梦的少年', '1', '© 2017 <a target=\"_blank\" href=\"https://lscho.com/\">lscho</a>');

-- --------------------------------------------------------

--
-- 表的结构 `ls_user`
--

CREATE TABLE `ls_user` (
  `id` int(10) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `qq` varchar(15) DEFAULT NULL,
  `github` varchar(100) DEFAULT NULL,
  `zhihu` varchar(100) DEFAULT NULL,
  `weibo` varchar(100) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `encrypt` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `ls_user`
--

INSERT INTO `ls_user` (`id`, `username`, `email`, `qq`, `github`, `zhihu`, `weibo`, `password`, `encrypt`) VALUES
(1, 'admin', 'me@lscho.com', '', NULL, NULL, NULL, '24d8cee9ed793b9f818b6c4b67aae9aa', 'Mje5sowT7');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ls_content`
--
ALTER TABLE `ls_content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ls_meta`
--
ALTER TABLE `ls_meta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ls_site`
--
ALTER TABLE `ls_site`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ls_user`
--
ALTER TABLE `ls_user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `ls_content`
--
ALTER TABLE `ls_content`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `ls_meta`
--
ALTER TABLE `ls_meta`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- 使用表AUTO_INCREMENT `ls_site`
--
ALTER TABLE `ls_site`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `ls_user`
--
ALTER TABLE `ls_user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
