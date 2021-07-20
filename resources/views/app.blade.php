<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="/css/app.css" rel="stylesheet">
    <script>
        window.basePath = "{{request()->root()}}";
        window.baseApiPath = "{{request()->root()}}/api";
    </script>
</head>
<body>
<div id="root"></div>
<script src="{{mix('js/index.js')}}"></script>
</body>
</html>
