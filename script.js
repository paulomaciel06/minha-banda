class FormularioOrcamento {
    constructor() {
        this.form = document.getElementById('orcamentoForm');
        this.etapaAtual = 1;
        this.totalEtapas = 7;
        this.dados = {};
        
        this.etapas = {
            1: {
                titulo: 'Que tipo de evento você está planejando?',
                opcoes: [
                    {valor: 'casamento', texto: 'Casamento'},
                    {valor: 'evento-publico', texto: 'Evento Público'},
                    {valor: 'festa-particular', texto: 'Festa Particular'},
                    {valor: 'outros', texto: 'Outros'}
                ]
            },
            2: {
                titulo: 'Qual formato você prefere?',
                opcoes: [
                    {valor: 'acustico', texto: 'Acústico'},
                    {valor: 'banda-completa', texto: 'Banda Completa'}
                ]
            },
            3: {
                titulo: 'Selecione a data do seu evento',
                tipo: 'data'
            },
            4: {
                titulo: 'Qual horário do evento?',
                tipo: 'horario'
            },
            5: {
                titulo: 'Qual o local do evento?',
                opcoes: [
                    {valor: 'joao-pessoa', texto: 'João Pessoa'},
                    {valor: 'outra-cidade', texto: 'Outra Cidade'}
                ]
            },
            6: {
                titulo: 'Há necessidade de equipamento de som?',
                opcoes: [
                    {valor: 'sim-som', texto: 'Sim'},
                    {valor: 'nao-som', texto: 'Não'}
                ]
            },
            7: {
                titulo: 'Seu orçamento está pronto, só falta enviar para o WhatsApp',
                tipo: 'contato'
            }
        };

        this.inicializar();
    }

    inicializar() {
        this.renderizarEtapa();
        this.adicionarEventos();
        this.atualizarProgresso();
    }

    renderizarEtapa() {
        const etapa = this.etapas[this.etapaAtual];
        if (!etapa) return;

        let html;
        if (etapa.tipo === 'data') {
            html = `
                <div class="step">
                    <h2>${etapa.titulo}</h2>
                    <div class="options">
                        <input type="text" 
                               class="date-input" 
                               placeholder="DD/MM/AAAA"
                               maxlength="10">
                    </div>
                </div>
            `;
        } else if (etapa.tipo === 'horario') {
            html = `
                <div class="step">
                    <h2>${etapa.titulo}</h2>
                    <div class="options">
                        <input type="text" 
                               class="date-input" 
                               placeholder="HH:MM"
                               maxlength="5"
                               id="horarioInput">
                    </div>
                </div>
            `;
        } else if (etapa.tipo === 'contato') {
            html = `
                <div class="step">
                    <h2>${etapa.titulo}</h2>
                    <div class="contact-options">
                        <button onclick="formulario.enviarWhatsapp()" 
                                class="whatsapp-btn">
                            <i class="fab fa-whatsapp"></i>
                            Enviar por WhatsApp
                        </button>
                        <div class="social-buttons">
                            <a href="https://www.instagram.com/paulopmaciel/" 
                               target="_blank" 
                               class="social-btn instagram-btn">
                                <i class="fab fa-instagram"></i>
                                Instagram
                            </a>
                            <a href="https://www.youtube.com/c/XoteNós3oficial" 
                               target="_blank" 
                               class="social-btn youtube-btn">
                                <i class="fab fa-youtube"></i>
                                YouTube
                            </a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            html = `
                <div class="step">
                    <h2>${etapa.titulo}</h2>
                    <div class="options">
                        ${etapa.opcoes.map(opcao => `
                            <button type="button" 
                                    class="option-btn" 
                                    data-valor="${opcao.valor}">
                                ${opcao.texto}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        html += `
            <div class="navigation-buttons">
                ${this.etapaAtual > 1 ? `
                    <button type="button" class="nav-btn back" onclick="formulario.voltarEtapa()">
                        <span>←</span> Voltar
                    </button>
                ` : '<div></div>'}
            </div>
        `;

        requestAnimationFrame(() => {
            this.form.style.opacity = '0';
            requestAnimationFrame(() => {
                this.form.innerHTML = html;
                this.form.style.opacity = '1';
                this.form.classList.add('animate-fade-in');
                
                if (etapa.tipo === 'data') {
                    this.inicializarEventosData();
                } else if (etapa.tipo === 'horario') {
                    this.inicializarEventosHorario();
                }
            });
        });
    }

    inicializarEventosData() {
        const input = this.form.querySelector('.date-input');
        input.focus();
        
        input.addEventListener('input', (e) => {
            let valor = e.target.value;
            
            // Remove classes de validação ao começar a editar
            input.classList.remove('valid', 'invalid');
            
            // Se estiver apagando (backspace/delete), permite a ação
            if (valor.length < input.oldValue?.length) {
                input.oldValue = valor;
                return;
            }
            
            // Formata apenas números
            valor = valor.replace(/\D/g, '');
            if (valor.length > 8) valor = valor.slice(0, 8);
            
            // Formata a data
            if (valor.length >= 4) {
                valor = valor.slice(0, 2) + '/' + valor.slice(2, 4) + '/' + valor.slice(4);
            } else if (valor.length >= 2) {
                valor = valor.slice(0, 2) + '/' + valor.slice(2);
            }
            
            e.target.value = valor;
            input.oldValue = valor;
            
            // Valida a data quando completa
            if (valor.length === 10) {
                if (this.validarData(valor)) {
                    this.dados[`etapa${this.etapaAtual}`] = valor;
                    input.classList.add('valid');
                    setTimeout(() => this.avancarEtapa(), 500);
                } else {
                    input.classList.add('invalid');
                }
            }
        });

        // Adiciona suporte ao backspace/delete
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                input.classList.remove('valid', 'invalid');
            }
        });
    }

    inicializarEventosHorario() {
        const input = this.form.querySelector('#horarioInput');
        input.focus();
        
        input.addEventListener('input', (e) => {
            let valor = e.target.value;
            
            // Remove classes de validação ao começar a editar
            input.classList.remove('valid', 'invalid');
            
            // Se estiver apagando, permite a ação
            if (valor.length < input.oldValue?.length) {
                input.oldValue = valor;
                return;
            }
            
            // Formata apenas números
            valor = valor.replace(/\D/g, '');
            if (valor.length > 4) valor = valor.slice(0, 4);
            
            // Formata o horário
            if (valor.length >= 2) {
                valor = valor.slice(0, 2) + ':' + valor.slice(2);
            }
            
            e.target.value = valor;
            input.oldValue = valor;
            
            // Valida o horário quando completo
            if (valor.length === 5) {
                if (this.validarHorario(valor)) {
                    this.dados[`etapa${this.etapaAtual}`] = valor;
                    input.classList.add('valid');
                    setTimeout(() => this.avancarEtapa(), 500);
                } else {
                    input.classList.add('invalid');
                }
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                input.classList.remove('valid', 'invalid');
            }
        });
    }

    adicionarEventos() {
        this.form.addEventListener('click', (e) => {
            const botao = e.target.closest('.option-btn');
            if (botao) {
                this.processarSelecao(botao);
            }
        });
    }

    processarSelecao(botao) {
        if (!botao) return;

        const botoesAtuais = this.form.querySelectorAll('.option-btn');
        botoesAtuais.forEach(btn => btn.classList.remove('selected'));
        
        botao.classList.add('selected');
        
        if (this.etapaAtual === 5 && botao.dataset.valor === 'outra-cidade') {
            this.mostrarInputCidade();
        } else {
            this.dados[`etapa${this.etapaAtual}`] = botao.dataset.valor;
            setTimeout(() => {
                this.avancarEtapa();
            }, 400);
        }
    }

    mostrarInputCidade() {
        const opcoesDiv = this.form.querySelector('.options');
        const inputHTML = `
            <div class="cidade-input-container animate-fade-in">
                <input type="text" 
                       class="date-input" 
                       placeholder="Digite o nome da cidade"
                       id="cidadeInput">
                <button type="button" 
                        class="nav-btn" 
                        onclick="formulario.confirmarCidade()">
                    Confirmar
                </button>
            </div>
        `;
        opcoesDiv.innerHTML = inputHTML;
        
        const input = document.getElementById('cidadeInput');
        input.focus();
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                this.confirmarCidade();
            }
        });
    }

    confirmarCidade() {
        const input = document.getElementById('cidadeInput');
        const cidade = input.value.trim();
        
        if (cidade) {
            this.dados[`etapa${this.etapaAtual}`] = cidade;
            setTimeout(() => this.avancarEtapa(), 500);
        } else {
            input.classList.add('invalid');
            setTimeout(() => input.classList.remove('invalid'), 500);
        }
    }

    avancarEtapa() {
        if (this.etapaAtual < this.totalEtapas) {
            this.etapaAtual++;
            this.renderizarEtapa();
            this.atualizarProgresso();
        } else {
            this.finalizarFormulario();
        }
    }

    atualizarProgresso() {
        const progresso = document.querySelector('.progress');
        const porcentagem = ((this.etapaAtual - 1) / this.totalEtapas) * 100;
        progresso.style.width = `${porcentagem}%`;
    }

    finalizarFormulario() {
        console.log('Dados coletados:', this.dados);
        alert('Formulário finalizado! Redirecionando para o WhatsApp...');
    }

    validarData(data) {
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return false;
        
        const [dia, mes, ano] = data.split('/').map(Number);
        const dataObj = new Date(ano, mes - 1, dia);
        const hoje = new Date();
        
        return dataObj > hoje && 
               dataObj.getDate() === dia && 
               dataObj.getMonth() === mes - 1 && 
               dataObj.getFullYear() === ano;
    }

    validarHorario(horario) {
        if (!/^\d{2}:\d{2}$/.test(horario)) return false;
        
        const [horas, minutos] = horario.split(':').map(Number);
        
        return horas >= 0 && horas <= 23 && minutos >= 0 && minutos <= 59;
    }

    abrirCalendario() {
        // Criar e abrir modal do calendário
        const modal = document.createElement('div');
        modal.className = 'calendar-modal';
        modal.innerHTML = `
            <button class="calendar-close">&times;</button>
            ${this.renderizarCalendario()}
        `;
        
        document.body.appendChild(modal);
        requestAnimationFrame(() => modal.classList.add('active'));
        
        // Inicializar calendário
        this.inicializarCalendario();
        
        // Eventos do modal
        modal.querySelector('.calendar-close').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
    }

    voltarEtapa() {
        if (this.etapaAtual > 1) {
            this.etapaAtual--;
            this.renderizarEtapa();
            this.atualizarProgresso();
        }
    }

    mostrarFeedback(tipo, mensagem) {
        const feedback = document.createElement('div');
        feedback.className = `feedback-mensagem ${tipo}`;
        feedback.textContent = mensagem;
        
        this.form.appendChild(feedback);
        
        // Animação de entrada
        requestAnimationFrame(() => {
            feedback.classList.add('visible');
        });
        
        // Remove após 3 segundos
        setTimeout(() => {
            feedback.classList.remove('visible');
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }

    enviarWhatsapp() {
        // Completa a barra de progresso
        const progresso = document.querySelector('.progress');
        progresso.style.width = '100%';
        
        // Adiciona classe de conclusão (opcional)
        progresso.classList.add('completed');
        
        // Formata e envia mensagem
        const mensagem = this.formatarMensagemWhatsapp();
        const urlWhatsapp = `https://wa.me/5583999196364?text=${encodeURIComponent(mensagem)}`;
        window.open(urlWhatsapp, '_blank');
    }

    formatarMensagemWhatsapp() {
        const tipoEvento = this.dados.etapa1;
        const formato = this.dados.etapa2;
        const data = this.dados.etapa3;
        const horario = this.dados.etapa4;
        const local = this.dados.etapa5;
        const som = this.dados.etapa6;

        return `Olá! Gostaria de fazer um orçamento:
        
📅 Evento: ${tipoEvento}
🎵 Formato: ${formato}
📆 Data: ${data}
⏰ Horário: ${horario}
📍 Local: ${local}
🔊 Equipamento de som: ${som}`;
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    window.formulario = new FormularioOrcamento();
});

// Adicione esta função onde você muda de etapa
function focusInput() {
    setTimeout(() => {
        const input = document.querySelector('.current-step input');
        if (input) {
            input.focus();
            // Para dispositivos iOS
            input.click();
        }
    }, 300);
}

// Chame esta função depois de mudar de etapa
function goToNextStep() {
    // ... seu código existente ...
    focusInput();
}

function handleWhatsAppClick(event) {
    event.preventDefault();
    
    // Completa a barra de progresso
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = '100%';
    
    // Monta a mensagem
    const message = encodeURIComponent(generateWhatsAppMessage());
    const phoneNumber = 'seu-numero'; // seu número com código do país
    
    // Detecta se é dispositivo móvel
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Define a URL do WhatsApp
    const whatsappUrl = isMobile
        ? `whatsapp://send?phone=${phoneNumber}&text=${message}`
        : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    
    // Abre em nova janela/aba
    if (isMobile) {
        // Para mobile, usa window.open com target _blank
        const newWindow = window.open(whatsappUrl, '_blank');
        
        // Fallback caso o window.open seja bloqueado
        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
            window.location.href = whatsappUrl;
        }
    } else {
        // Para desktop, sempre abre em nova aba
        window.open(whatsappUrl, '_blank');
    }
    
    return false;
}

// Atualiza os event listeners
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn, .social-btn');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleWhatsAppClick(e);
            return false;
        });
    });
});

// Adicione isto ao início do seu arquivo
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se tem um estado salvo
    const lastStep = localStorage.getItem('lastStep');
    if (lastStep === 'final') {
        showLastStep(); // função que mostra a última etapa
        localStorage.removeItem('lastStep'); // limpa o estado
    }
});

// Adicione esta função para persistir o estado
function saveFormState() {
    const currentStep = document.querySelector('.step.current-step');
    if (currentStep) {
        sessionStorage.setItem('currentStep', currentStep.dataset.step);
    }
}

// Restaura o estado quando voltar do WhatsApp
function restoreFormState() {
    const savedStep = sessionStorage.getItem('currentStep');
    if (savedStep) {
        showStep(parseInt(savedStep));
    }
}

// Adicione aos event listeners
document.addEventListener('DOMContentLoaded', function() {
    restoreFormState();
    
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            saveFormState();
            handleWhatsAppClick(e);
        });
    }
});

// Atualiza a função de progresso
function updateProgress(currentStep, totalSteps) {
    const progressBar = document.querySelector('.progress-bar');
    const progress = (currentStep / totalSteps) * 100;
    
    // Se for a última etapa, complete a barra
    if (currentStep === totalSteps) {
        progressBar.style.width = '100%';
    } else {
        progressBar.style.width = `${progress}%`;
    }
}

// Máscara para data
function maskDate(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);
        
        if (value.length >= 4) {
            value = value.replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3');
        } else if (value.length >= 2) {
            value = value.replace(/^(\d{2})(\d{2})?.*/, '$1/$2');
        }
        
        e.target.value = value;
    });
}

// Máscara para hora
function maskTime(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        
        if (value.length >= 2) {
            let hours = value.slice(0, 2);
            let minutes = value.slice(2);
            
            if (parseInt(hours) > 23) hours = '23';
            if (parseInt(minutes) > 59) minutes = '59';
            
            value = hours + (minutes ? ':' + minutes : '');
        }
        
        e.target.value = value;
    });
}

// Aplicar as máscaras
document.addEventListener('DOMContentLoaded', function() {
    const dateInputs = document.querySelectorAll('.date-input');
    const timeInputs = document.querySelectorAll('.time-input');
    
    dateInputs.forEach(input => maskDate(input));
    timeInputs.forEach(input => maskTime(input));
});

function showStep(step) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(s => s.classList.remove('current-step'));

    const currentStep = document.querySelector(`.step[data-step="${step}"]`);
    currentStep.classList.add('current-step');

    // Novo código para forçar foco no Safari iOS
    setTimeout(() => {
        const input = currentStep.querySelector('input');
        if (input) {
            // Remove readonly temporariamente
            input.readOnly = false;
            
            // Força o scroll para o topo
            window.scrollTo(0, 0);
            
            // Sequência de foco para iOS Safari
            input.blur();
            input.focus();
            input.click();
            
            // Tenta novamente após um pequeno delay
            setTimeout(() => {
                input.click();
                input.focus();
            }, 100);
        }
    }, 300);
}

// Adicione este código para garantir o foco
document.addEventListener('DOMContentLoaded', function() {
    // Manipulador para overlay
    document.querySelectorAll('.input-overlay').forEach(overlay => {
        overlay.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input) {
                input.focus();
                input.click();
            }
        });
    });

    // Previne comportamento padrão do Safari
    document.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'INPUT') {
            e.target.focus();
        }
    }, false);
});