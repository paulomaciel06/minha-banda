document.getElementById('formularioOrcamento').addEventListener('submit', function(evento) {
    evento.preventDefault();

    const dataEscolhida = document.getElementById('dataEvento').value;
    const horarioEscolhido = document.getElementById('horarioEvento').value;
    const localEscolhido = document.getElementById('localEvento').value;
    const tipoShowEscolhido = document.getElementById('tipoShow').value;
    const precisaEquipamento = document.getElementById('equipamentoSom').checked;

    const mensagemWhatsapp = `Olá! Gostaria de fazer um orçamento para show:
Data: ${dataEscolhida}
Horário: ${horarioEscolhido}
Local: ${localEscolhido}
Formato: ${tipoShowEscolhido}
Som: ${precisaEquipamento ? 'Precisa levar som' : 'Já possui som'}`;

    // Seu número de WhatsApp (substitua pelo seu, mantendo o código do país e DDD)
    const numeroWhatsapp = '5511999999999';

    const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagemWhatsapp)}`;

    window.open(linkWhatsapp);
});
