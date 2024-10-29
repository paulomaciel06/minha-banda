document.getElementById('formularioOrcamento').addEventListener('submit', function(evento) {
    evento.preventDefault();
    const botao = evento.target.querySelector('button');
    
    botao.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abrindo WhatsApp...';
    botao.disabled = true;

    const dataEscolhida = document.getElementById('dataEvento').value;
    // Converte a data para o formato dd/mm/aaaa
    const dataFormatada = new Date(dataEscolhida).toLocaleDateString('pt-BR');

    const horarioEscolhido = document.getElementById('horarioEvento').value;
    const localEscolhido = document.getElementById('localEvento').value;
    const tipoShowEscolhido = document.getElementById('tipoShow').value;
    const precisaEquipamento = document.getElementById('equipamentoSom').checked;

    const mensagemWhatsapp = `Olá! Gostaria de fazer um orçamento para show

Data: ${dataFormatada}
Horário: ${horarioEscolhido}
Local: ${localEscolhido}
Formato: ${tipoShowEscolhido}
Equipamento: ${precisaEquipamento ? 'Precisa levar som' : 'Já possui som'}

Aguardo seu retorno!`;

    // Substitua este número pelo seu (mantenha o código do país e DDD)
    const numeroWhatsapp = '5511999999999';

    const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagemWhatsapp)}`;

    setTimeout(() => {
        window.open(linkWhatsapp);
        setTimeout(() => {
            botao.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar no WhatsApp';
            botao.disabled = false;
        }, 1000);
    }, 500);
});

// Adiciona a data atual como valor inicial do input de data
window.addEventListener('load', function() {
    const hoje = new Date();
    const dataFormatadaInput = hoje.toISOString().split('T')[0];
    document.getElementById('dataEvento').value = dataFormatadaInput;
});
