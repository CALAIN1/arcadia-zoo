<?php


if (isset($_GET['page'])) {
    $url = str_replace('.html', '', $_GET['page']);
    if ($url == '' || $url == '/') {
        $url = 'home';
    }
} else {
    $url = 'home';
}

if (file_exists('front/view/' . $url . '.html')) {
    $indexContent = file_get_contents('front/template/index.html');
    $pageContent = file_get_contents('front/view/' . $url . '.html');

    $orphensCount = preg_match_all('/<(link|meta)\s.*?\/?>/', $pageContent, $orphens);
    $tagsCount = preg_match_all('/<(title|script).*?>.*<\/(title|script){1}?>/', $pageContent, $tags);

    $headContent = '';
    for ($i = 0; $i < $orphensCount; $i++) {
        $headContent .= $orphens[0][$i];
        $pageContent = str_replace($orphens[0][$i], '', $pageContent);
    }
    for ($i = 0; $i < $tagsCount; $i++) {
        $headContent .= $tags[0][$i];
        $pageContent = str_replace($tags[0][$i], '', $pageContent);
    }

    $indexContent = str_replace('{{HEAD_CONTENT}}', $headContent, $indexContent);
    $indexContent = str_replace('{{PAGE_CONTENT}}', $pageContent, $indexContent);
    echo $indexContent;
} else {
    echo $url . ' not found';
    http_response_code(404);
}

/*switch ($url) {
    case '/':
    case '/home':
        $pageContent = file_get_contents('home.html');
        break;

    case '/index':
        $pageContent = file_get_contents('index.html');
        break;

    case '/services':
        $pageContent = file_get_contents('services.html');
        break;

    case '/habitats':
        $pageContent = file_get_contents('habitats.html');
        break;

    default:
        //http_response_code(404);
        var_dump($url);
        break;
}

$indexContent = str_replace('{{PAGE_CONTENT}}', $pageContent, $indexContent);
echo $indexContent;*/
