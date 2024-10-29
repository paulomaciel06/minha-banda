window.addEventListener('load', function() {
    const hoje = new Date();
    const dataFormatadaInput = hoje.toISOString().split('T')[0];
    const inputData = document.getElementById('dataEvento');
    
    inputData.value = dataFormatadaInput;
    inputData.min = dataFormatadaInput;

    document.getElementById('localSelect').addEventListener('change', function() {
        const localOutro = document.getElementById('localOutro');
        if (this.value === 'outros') {
            localOutro.style.display = 'block';
            localOutro.required = true;
            this.required = false;
        } else {
            localOutro.style.display = 'none';
            localOutro.required = false;
            this.required = true;
        }
    });
});

document.getElementById('formularioOrcamento').addEventListener('submit', function(evento) {
    evento.preventDefault();
    const botao = evento.target.querySelector('button');
    
    botao.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abrindo WhatsApp...';
    botao.disabled = true;

    const dataEscolhida = document.getElementById('dataEvento').value;
    // Corrige o problema do fuso horário adicionando um dia
    const data = new Date(dataEscolhida);
    data.setDate(data.getDate() + 1);
    const dataFormatada = data.toLocaleDateString('pt-BR');

    const horarioEscolhido = document.getElementById('horarioEvento').value;
    const localSelect = document.getElementById('localSelect');
    const localOutro = document.getElementById('localOutro');
    const localEscolhido = localSelect.value === 'outros' ? localOutro.value : localSelect.value;
    const tipoShowEscolhido = document.getElementById('tipoShow').value;
    // Formata o tipo do show
    const tipoShowFormatado = tipoShowEscolhido === 'acustico' ? 'Acústico' : 'Banda Completa';
    const precisaEquipamento = document.getElementById('equipamentoSom').checked;

    const mensagemWhatsapp = `Olá! Gostaria de fazer um orçamento para show

Data: ${dataFormatada}
${horarioEscolhido ? `Horário: ${horarioEscolhido}` : ''}
Local: ${localEscolhido}
Formato: ${tipoShowFormatado}
Equipamento: ${precisaEquipamento ? 'Precisa levar som' : 'Já possui som'}

Aguardo seu retorno!`;

    // Substitua este número pelo seu (mantenha o código do país e DDD)
    const numeroWhatsapp = '5583999196364';

    const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagemWhatsapp)}`;

    setTimeout(() => {
        window.open(linkWhatsapp);
        setTimeout(() => {
            botao.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar no WhatsApp';
            botao.disabled = false;
        }, 1000);
    }, 500);
});
