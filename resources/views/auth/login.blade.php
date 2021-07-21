<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="{{mix('css/app.css')}}">
    <title>Login</title>

</head>
<body class="bg-gray-200 relative min-h-screen">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg border w-96 shadow-lg bg-gray-50 p-6">
        <div class="text-center mb-2">
            <h1 class="text-2xl font-bold">היכנס</h1>
        </div>
        <form action="{{route('login')}}" method="POST" class="flex-col flex space-y-4">
            @csrf
            <label class="text-gray-800 font-semibold w-full flex flex-col space-y-2">
                <div class="text-sm">אימייל</div>
                <input type="text" id="email" name="email" class="rounded-lg border border-gray-300 w-full text-base p-2 "/>
                @error('email')
                    <small class="text-error-500">{{$message}}</small>
                @enderror
            </label>
            <label class="text-gray-800 font-semibold w-full flex flex-col space-y-2">
                <div class="text-sm">סיסמא</div>
                <input type="password" id="password" name="password" class="rounded-lg border border-gray-300 w-full text-base p-2 "/>
                @error('password')
                    <small class="text-error-500">{{$message}}</small>
                @enderror
            </label>
            <label class="text-gray-800 font-semibold w-full flex space-s-2 items-center justify-start">
                <input type="checkbox" id="remember" name="remember" class="focus:outline-none rounded border border-gray-300 text-base p-2 "/>
                <div class="text-sm leading-none">זכור אותי</div>
            </label>
            <div class="flex justify-end pt-2">
                <button type="submit" class="bg-primary-600 text-white font-bold rounded-lg p-2 px-4">
                    כניסה
                </button>
            </div>
        </form>
    </div>
</body>
</html>
