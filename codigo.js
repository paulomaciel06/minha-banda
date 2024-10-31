function rolarPara(id) {
    if (id === 'top') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Sistema de navegação da agenda
const meses = [
    'novembro2024',
    'dezembro2024',
    'janeiro2025',
    'fevereiro2025',
    'marco2025'
];

const nomesMeses = {
    'novembro2024': 'Novembro 2024',
    'dezembro2024': 'Dezembro 2024',
    'janeiro2025': 'Janeiro 2025',
    'fevereiro2025': 'Fevereiro 2025',
    'marco2025': 'Março 2025'
};

let mesAtualIndex = 0;

function mudarMes(direcao) {
    let novoIndex;
    
    if (direcao === 'proximo') {
        // Verifica se já está no último mês
        if (mesAtualIndex >= meses.length - 1) return;
        novoIndex = mesAtualIndex + 1;
    } else {
        // Verifica se já está no primeiro mês
        if (mesAtualIndex <= 0) return;
        novoIndex = mesAtualIndex - 1;
    }
    
    // Esconde o mês atual
    const mesAtual = document.querySelector(`[data-mes="${meses[mesAtualIndex]}"]`);
    if (mesAtual) {
        mesAtual.style.display = 'none';
    }
    
    // Atualiza o índice
    mesAtualIndex = novoIndex;
    
    // Mostra o novo mês
    const novoMes = document.querySelector(`[data-mes="${meses[mesAtualIndex]}"]`);
    if (novoMes) {
        novoMes.style.display = 'block';
    }
    
    // Atualiza o título
    const elementoTitulo = document.getElementById('mes-atual');
    if (elementoTitulo) {
        elementoTitulo.textContent = nomesMeses[meses[mesAtualIndex]];
    }

    // Atualiza estado dos botões
    atualizarBotoesNavegacao();
}

function atualizarBotoesNavegacao() {
    const btnAnterior = document.querySelector('.botao-mes[onclick*="anterior"]');
    const btnProximo = document.querySelector('.botao-mes[onclick*="proximo"]');
    
    if (btnAnterior) {
        btnAnterior.disabled = mesAtualIndex <= 0;
        btnAnterior.style.opacity = mesAtualIndex <= 0 ? '0.5' : '1';
    }
    
    if (btnProximo) {
        btnProximo.disabled = mesAtualIndex >= meses.length - 1;
        btnProximo.style.opacity = mesAtualIndex >= meses.length - 1 ? '0.5' : '1';
    }
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Esconde todos os meses exceto o primeiro
    document.querySelectorAll('.mes-container').forEach(mes => {
        mes.style.display = 'none';
    });
    
    // Mostra o primeiro mês
    const primeiroMes = document.querySelector(`[data-mes="${meses[0]}"]`);
    if (primeiroMes) {
        primeiroMes.style.display = 'block';
    }

    // Configura estado inicial dos botões
    atualizarBotoesNavegacao();

    // Configuração do campo de data
    const campoData = document.getElementById('dataEvento');
    
    // Pega a data atual
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const dataAtual = `${ano}-${mes}-${dia}`;
    
    // Define a data mínima como hoje
    campoData.min = dataAtual;
    
    // Define o valor inicial como hoje
    campoData.value = dataAtual;

    document.getElementById('localSelect').addEventListener('change', function() {
        const localOutro = document.getElementById('localOutro');
        if (this.value === 'outros') {
            localOutro.style.display = 'block';
            localOutro.required = true;
        } else {
            localOutro.style.display = 'none';
            localOutro.required = false;
            localOutro.value = ''; // Limpa o campo quando escondido
        }
    });
});

function enviarWhatsApp(event) {
    event.preventDefault();
    
    // Pega os valores dos campos
    const data = new Date(document.getElementById('dataEvento').value);
    const dataFormatada = data.toLocaleDateString('pt-BR');
    const horario = document.getElementById('horarioEvento').value;
    const local = document.getElementById('localSelect').value === 'outros' 
        ? document.getElementById('localOutro').value 
        : document.getElementById('localSelect').value;
    const tipoShow = document.getElementById('tipoShow').value;
    const equipamentoSom = document.getElementById('equipamentoSom').checked;

    // Monta a mensagem
    let mensagem = `Olá! Gostaria de solicitar um orçamento para um show:\n\n`;
    mensagem += `Data: ${dataFormatada}\n`;
    mensagem += horario ? `Horário: ${horario}\n` : '';
    mensagem += `Local: ${local}\n`;
    mensagem += `Formato: ${tipoShow === 'acustico' ? 'Acústico' : 'Banda Completa'}\n`;
    mensagem += `Equipamento de som: ${equipamentoSom ? 'Sim' : 'Não'}`;

    // Codifica a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Abre o WhatsApp com a mensagem
    window.open(`https://wa.me/5583999196364?text=${mensagemCodificada}`, '_blank');
}
