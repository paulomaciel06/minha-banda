document.getElementById('formularioOrcamento').addEventListener('submit', function(evento) {
    evento.preventDefault();
    const botao = evento.target.querySelector('button');
    
    botao.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abrindo WhatsApp...';
    botao.disabled = true;

    const dataEscolhida = document.getElementById('dataEvento').value;
    const horarioEscolhido = document.getElementById('horarioEvento').value;
    const localEscolhido = document.getElementById('localEvento').value;
    const tipoShowEscolhido = document.getElementById('tipoShow').value;
    const precisaEquipamento = document.getElementById('equipamentoSom').checked;

    const mensagemWhatsapp = `Olá! Gostaria de fazer um orçamento para show %E2%9C%A8

%F0%9F%93%85 Data: ${dataEscolhida}
%E2%8F%B0 Horário: ${horarioEscolhido}
%F0%9F%93%8D Local: ${localEscolhido}
%F0%9F%8E%B5 Formato: ${tipoShowEscolhido}
%F0%9F%94%8A Equipamento: ${precisaEquipamento ? 'Precisa levar som' : 'Já possui som'}

Aguardo seu retorno! %F0%9F%98%8A`;

    // Substitua este número pelo seu (mantenha o código do país e DDD)
    const numeroWhatsapp = '5583999196364';

    const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${mensagemWhatsapp}`;

    setTimeout(() => {
        window.open(linkWhatsapp);
        setTimeout(() => {
            botao.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar no WhatsApp';
            botao.disabled = false;
        }, 1000);
    }, 500);
});
