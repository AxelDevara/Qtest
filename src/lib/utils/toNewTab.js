const toNewTab = async (type, data) => {
  switch (type) {
    case 'discord':
      return window.open(`https://discord.gg/${data}`, '_blank');
      break;
    case 'telegram':
      return window.open(`https://t.me/${data}`, '_blank').focus();
      break;
    case 'github':
      window.open(`https://github.com/${data}`).focus();
      break;
    case 'line':
      window.open(`https://line.me/R/ti/p/~${data}`).focus();
      break;
    case 'whatsapp':
      window.open('https://wa.me/' + data, '_blank').focus();
      break;
    case 'facebook':
      window.open('https://facebook.com/' + data, '_blank').focus();
      break;
    case 'twitter':
      window.open('https://twitter.com/' + data, '_blank').focus();
      break;
    case 'tiktok':
      window.open('https://tiktok.com/' + data, '_blank').focus();
      break;
    case 'linkedin':
      window.open('https://linkedin.com/' + data, '_blank').focus();
      break;
    case 'youtube':
      window.open('https://youtube.com/' + data, '_blank').focus();
      break;
    case 'instagram':
      window.open('https://instagram.com/' + data, '_blank').focus();
      break;
    case 'email':
      await window.open('mailto:' + data, '_blank').focus();
      break;
    case 'phone':
      window.open('tel:' + data, '_blank').focus();
      break;
    default:
      break;
  }
};

export default toNewTab;
