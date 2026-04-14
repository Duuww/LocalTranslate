// 【新增】语言与文本交换按钮逻辑
document.getElementById('swap-btn').addEventListener('click', () => {
    const sourceSelect = document.getElementById('source-lang');
    const targetSelect = document.getElementById('target-lang');
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    
    // 1. 交换下拉框中的语种
    const tempLang = sourceSelect.value;
    sourceSelect.value = targetSelect.value;
    targetSelect.value = tempLang;

    // 2. 顺便交换输入框和输出框里的文本（更符合人类操作直觉）
    const tempText = inputText.value;
    inputText.value = outputText.value;
    outputText.value = tempText;
    
    // 清除状态提示
    document.getElementById('status').innerText = "已切换语言方向";
    document.getElementById('status').style.color = "#666";
});


// 原有的翻译按钮逻辑
document.getElementById('translate-btn').addEventListener('click', async () => {
    const text = document.getElementById('input-text').value;
    
    // 【修改】分别从两个下拉框获取语言代码
    const sourceLang = document.getElementById('source-lang').value;
    const targetLang = document.getElementById('target-lang').value;
    
    const statusDiv = document.getElementById('status');
    const outputText = document.getElementById('output-text');
    const btn = document.getElementById('translate-btn');

    if (!text.trim()) return;

    // 【新增】防呆设计：如果选了相同语言，直接复制文本，不发网络请求
    if (sourceLang === targetLang) {
        outputText.value = text;
        statusDiv.innerText = "⚠️ 源语言和目标语言相同";
        statusDiv.style.color = "#ff9800";
        return;
    }

    // UI 状态更新：加载中
    statusDiv.innerText = "翻译中...";
    statusDiv.style.color = "#007bff";
    outputText.value = "";
    btn.disabled = true;

    try {
        // 向本地 Python 服务发送 POST 请求
        const response = await fetch("http://127.0.0.1:5000/translate", {
            method: "POST",
            body: JSON.stringify({
                q: text,
                source: sourceLang,
                target: targetLang,
                format: "text"
            }),
            headers: { 
                "Content-Type": "application/json" 
            }
        });

        if (!response.ok) {
            throw new Error(`请求失败 (状态码: ${response.status})`);
        }

        const data = await response.json();
        
        // 显示翻译结果
        outputText.value = data.translatedText;
        statusDiv.innerText = "✅ 翻译完成";
        statusDiv.style.color = "green";

    } catch (error) {
        console.error("翻译出错:", error);
        statusDiv.innerText = "❌ 连接失败，请检查终端 LibreTranslate 是否运行";
        statusDiv.style.color = "red";
    } finally {
        // 恢复按钮状态
        btn.disabled = false;
    }
});