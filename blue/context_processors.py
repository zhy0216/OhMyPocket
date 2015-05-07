def settings_variable(request):
    import settings
    return { 'settings': settings }