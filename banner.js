document.addEventListener('DOMContentLoaded', function() {
    // banner msg
    const bannerMessages = [
        'welcome to ts',
        'Check out this new project im working on: <a href="https://arkidehome.arc360hub.com">ArkIDE</a>',
        'wow this is an anchent website',
        'average linux user',
        'WAAAHH WAAAHH WAHHH WAAAAHHH',
        'Powered by duct tape and code that works somehow',
        'This website is open source!',
        "i also run a minecraft server, check out the website at <a href='https://arkmc.arc360hub.com'>arkmc.arc360hub.com</a>",
    ];
    
    // pick rand
    const randomMessage = bannerMessages[Math.floor(Math.random() * bannerMessages.length)];
    
    const banner = document.createElement('div');
    banner.className = 'banner';
    banner.innerHTML = randomMessage;
    
    // insert
    document.body.insertBefore(banner, document.body.firstChild);
});