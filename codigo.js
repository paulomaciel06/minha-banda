document.getElementById('formularioOrcamento').addEventListener('submit', function(evento) {
    evento.preventDefault();
    const botao = evento.target.querySelector('button');
    
    // Adiciona estado de loading
    botao.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abrindo WhatsApp...';
    botao.disabled = true;

    const dataEscolhida = document.getElementById('dataEvento').value;
    const horarioEscolhido = document.getElementById('horarioEvento').value;
    const localEscolhido = document.getElementById('localEvento').value;
    const tipoShowEscolhido = document.getElementById('tipoShow').value;
    const precisaEquipamento = document.getElementById('equipamentoSom').checked;

    const mensagemWhatsapp = `Olá! Gostaria de fazer um orçamento para show ✨

📅 *Data:* ${dataEscolhida}
⏰ *Horário:* ${horarioEscolhido}
📍 *Local:* ${localEscolhido}
🎵 *Formato:* ${tipoShowEscolhido}
🔊 *Equipamento:* ${precisaEquipamento ? 'Precisa levar som' : 'Já possui som'}

Aguardo seu retorno! 🙂`;

    // Seu número de WhatsApp (substitua pelo seu, mantendo o código do país e DDD)
    const numeroWhatsapp = '5583999196364';

    const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagemWhatsapp)}`;

    setTimeout(() => {
        window.open(linkWhatsapp);
        // Restaura o botão após 1 segundo
        setTimeout(() => {
            botao.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar no WhatsApp';
            botao.disabled = false;
        }, 1000);
    }, 500);
});
