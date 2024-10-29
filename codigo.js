// Espera o formulário ser enviado
document.getElementById('formularioOrcamento').addEventListener('submit', function(evento) {
    // Impede o formulário de recarregar a página
    evento.preventDefault();

    // Pega os valores preenchidos no formulário
    const dataEscolhida = document.getElementById('dataEvento').value;
    const horarioEscolhido = document.getElementById('horarioEvento').value;
    const localEscolhido = document.getElementById('localEvento').value;
    const tipoShowEscolhido = document.getElementById('tipoShow').value;
    const precisaEquipamento = document.getElementById('equipamentoSom').checked;

    // Monta a mensagem que será enviada
    const mensagemWhatsapp = `Olá! Gostaria de fazer um orçamento para show:
📅 Data: ${dataEscolhida}
⏰ Horário: ${horarioEscolhido}
📍 Local: ${localEscolhido}
🎸 Formato: ${tipoShowEscolhido}
🔊 Som: ${precisaEquipamento ? 'Precisa levar som' : 'Já possui som'}`;

    // Seu número de WhatsApp (substitua pelo seu, mantendo o código do país e DDD)
    const numeroWhatsapp = '5583999196364';

    // Cria o link para abrir o WhatsApp com a mensagem
    const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagemWhatsapp)}`;

    // Abre o WhatsApp em uma nova janela
    window.open(linkWhatsapp);
});