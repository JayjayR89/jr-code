import React from "react";

export const Header = ({
  headerStyle,
  themeVars,
  project,
  mergeProject,
  inputBase,
  username,
  handlePuterLogin,
  puterReady,
  iconBtn,
  setShowUserPopup,
  showUserPopup,
  settings,
  tokenUsedPercent,
  switchUser,
  handlePuterLogout,
  handleSave,
  handleNew,
  setIsProjectsOpen,
  runPreview,
  setSettingsOpen,
}) => {
  return (
    <header className="w-full" style={headerStyle}>
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center font-bold text-white"
            style={{ backgroundColor: themeVars.primary }}
          >
            JR
          </div>
          <h1 className="text-[24px] font-bold tracking-tight">
            JR Live Codes
          </h1>
          <input
            value={project.title || ""}
            onChange={(e) => mergeProject({ title: e.target.value })}
            className="ml-3 px-3 py-2 text-sm"
            style={inputBase}
            placeholder="Project name"
          />
        </div>
        <div className="flex items-center gap-2">
          {!username ? (
            <button
              onClick={handlePuterLogin}
              className={iconBtn}
              style={{ ...inputBase, color: "#2ecc71", borderRadius: 0 }}
              disabled={!puterReady}
              title={puterReady ? "Login with Puter" : "Loading Puter"}
              aria-label="Puter login"
            >
              ⎈
            </button>
          ) : (
            <div className="relative">
              <div
                className="text-sm px-3 py-2 cursor-pointer"
                style={{ border: `1px solid ${themeVars.border}` }}
                onMouseEnter={() => setShowUserPopup(true)}
                onMouseLeave={() => setShowUserPopup(false)}
                onClick={() => setShowUserPopup(!showUserPopup)}
              >
                {username}
              </div>
              {showUserPopup && (
                <div
                  className="absolute top-full right-0 mt-1 w-64 p-4 z-50"
                  style={{
                    backgroundColor: themeVars.panel,
                    border: `1px solid ${themeVars.border}`,
                    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                  }}
                  onMouseEnter={() => setShowUserPopup(true)}
                  onMouseLeave={() => setShowUserPopup(false)}
                >
                  <div className="text-xs font-semibold mb-2">Token Usage</div>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>
                        Used: ${(settings?.userUsedTokens || 0).toFixed(4)}
                      </span>
                      <span>
                        Total: ${(settings?.puterTokenAmount || 0).toFixed(2)}
                      </span>
                    </div>
                    <div
                      className="w-full h-4"
                      style={{
                        backgroundColor: themeVars.bg,
                        border: `1px solid ${themeVars.border}`,
                      }}
                    >
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${tokenUsedPercent}%`,
                          backgroundColor:
                            tokenUsedPercent > 80
                              ? themeVars.danger
                              : tokenUsedPercent > 50
                              ? themeVars.warn
                              : themeVars.success,
                        }}
                      />
                    </div>
                    <div className="text-xs text-center mt-1">
                      {tokenUsedPercent.toFixed(1)}% Used
                    </div>
                  </div>

                  {settings?.previousUsers &&
                    settings.previousUsers.length > 0 && (
                      <div className="mb-3">
                        <div className="text-xs font-semibold mb-2">
                          Previous Users
                        </div>
                        <div className="space-y-1 max-h-32 overflow-y-auto no-scrollbar">
                          {settings.previousUsers.map((user, idx) => (
                            <button
                              key={idx}
                              onClick={() => switchUser(user)}
                              className="w-full text-left px-2 py-1 text-xs hover:opacity-80 transition-all"
                              style={{
                                backgroundColor:
                                  user === username
                                    ? themeVars.primary
                                    : themeVars.bg,
                                color:
                                  user === username ? "#fff" : themeVars.text,
                                border: `1px solid ${themeVars.border}`,
                              }}
                            >
                              {user}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  <button
                    onClick={handlePuterLogout}
                    className="w-full px-3 py-2 text-sm"
                    style={{
                      backgroundColor: themeVars.danger,
                      color: "#fff",
                      border: `1px solid ${themeVars.danger}`,
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <button
            onClick={handleSave}
            className={iconBtn}
            style={{ ...inputBase, borderRadius: 0 }}
            title="Save"
            aria-label="Save"
          >
            💾
          </button>
          <button
            onClick={handleNew}
            className={iconBtn}
            style={{ ...inputBase, borderRadius: 0 }}
            title="New"
            aria-label="New"
          >
            ＋
          </button>
          <button
            onClick={() => setIsProjectsOpen((v) => !v)}
            className={iconBtn}
            style={{ ...inputBase, borderRadius: 0 }}
            title="Projects"
            aria-label="Projects"
          >
            ☰
          </button>
          <button
            onClick={runPreview}
            className={iconBtn}
            style={{ ...inputBase, borderRadius: 0 }}
            title="Run"
            aria-label="Run"
          >
            ▶
          </button>
          <button
            onClick={() => setSettingsOpen(true)}
            className={iconBtn}
            style={{ ...inputBase, borderRadius: 0 }}
            title="Settings"
            aria-label="Settings"
          >
            ⚙️
          </button>
        </div>
      </div>
    </header>
  );
};

export const ChatPanel = ({
  panelStyle,
  chatW,
  themeVars,
  isPuterModel,
  isPollinationsModel,
  mergeProject,
  iconBtn,
  inputBase,
  model,
  setModel,
  availableModelGroups,
  selectedElement,
  setSelectedElement,
  chatScrollRef,
  project,
  collapsedMessages,
  editingMessageId,
  editText,
  setEditText,
  toggleMessageCollapse,
  handleResendMessage,
  handleSaveEdit,
  handleStartEdit,
  handleCopyMessage,
  handleDeleteMessage,
  handleRedoMessage,
  isGenerating,
  handleAIGenerate,
  chatInput,
  setChatInput,
  smallIconBtn,
}) => {
  return (
    <aside
      className="h-full flex flex-col"
      style={{
        ...panelStyle,
        width: `${chatW}%`,
        minWidth: 0,
        borderRight: `1px solid ${themeVars.border}`,
      }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${themeVars.border}` }}
      >
        <div className="text-[18px] font-semibold flex items-center gap-2">
          <span>AI Chat</span>
          {isPuterModel && (
            <span
              className="text-xs px-2 py-1"
              style={{
                border: `1px solid ${themeVars.border}`,
                backgroundColor: "transparent",
              }}
            >
              Puter
            </span>
          )}
          {isPollinationsModel && (
            <span
              className="text-xs px-2 py-1"
              style={{
                border: `1px solid ${themeVars.border}`,
                backgroundColor: "transparent",
              }}
            >
              Pollinations
            </span>
          )}
        </div>
        <button
          onClick={() => mergeProject({ chatHistory: [] })}
          className={iconBtn}
          style={{ ...inputBase, borderRadius: 0 }}
          aria-label="Clear chat"
        >
          🗑
        </button>
      </div>

      <div
        className="px-4 py-3"
        style={{ borderBottom: `1px solid ${themeVars.border}` }}
      >
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full px-2 py-2 text-sm"
          style={inputBase}
        >
          {Object.keys(availableModelGroups).length === 0 && (
            <option value="">No models enabled</option>
          )}
          {Object.keys(availableModelGroups).map((grp) => (
            <optgroup key={grp} label={grp}>
              {availableModelGroups[grp].map((m) => (
                <option key={`${grp}|${m.value}`} value={m.value}>
                  {m.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {selectedElement && (
        <div
          className="px-4 py-3"
          style={{
            borderBottom: `1px solid ${themeVars.border}`,
            backgroundColor: themeVars.bg,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold">
              Selected: {selectedElement.tagName}
            </div>
            <button
              onClick={() => setSelectedElement(null)}
              className="w-6 h-6 flex items-center justify-center text-xs"
              style={inputBase}
            >
              ×
            </button>
          </div>
          <div className="space-y-2 text-xs">
            {selectedElement.id && <div>ID: {selectedElement.id}</div>}
            {selectedElement.className && (
              <div>Class: {selectedElement.className}</div>
            )}
            <div className="flex gap-2 flex-wrap mt-3">
              <button className="px-3 py-1 text-xs" style={inputBase}>
                Edit Text
              </button>
              <button className="px-3 py-1 text-xs" style={inputBase}>
                Change Color
              </button>
              <button className="px-3 py-1 text-xs" style={inputBase}>
                Resize
              </button>
              <button
                className="px-3 py-1 text-xs"
                style={{
                  ...inputBase,
                  backgroundColor: themeVars.danger,
                  color: "#fff",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        ref={chatScrollRef}
        className="flex-1 p-4 space-y-3 overflow-y-auto no-scrollbar"
      >
        {(project.chatHistory || []).length === 0 && (
          <div className="text-xs opacity-70">
            Try prompts like: Create a hero section, Add a pricing table.
          </div>
        )}
        {(project.chatHistory || []).map((m, i) => {
          const messageId = `msg-${i}`;
          const isCollapsed = collapsedMessages.has(messageId);
          const isEditing = editingMessageId === i;

          return (
            <div key={i} className="space-y-1">
              {m.role === "assistant" && m.modelUsed && (
                <div className="text-[10px] opacity-60">
                  {m.modelUsed} • {new Date(m.timestamp).toLocaleTimeString()}
                </div>
              )}
              <div
                className={`max-w-[92%] px-3 py-2 text-sm cursor-pointer ${
                  m.role === "user" ? "ml-auto" : ""
                }`}
                style={{
                  backgroundColor:
                    m.role === "user"
                      ? themeVars.primary
                      : m.isError
                      ? themeVars.danger
                      : themeVars.bg,
                  color: m.role === "user" ? "#fff" : themeVars.text,
                  border: `1px solid ${themeVars.border}`,
                }}
                onClick={() => !isEditing && toggleMessageCollapse(messageId)}
              >
                {isEditing ? (
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 text-sm"
                    style={inputBase}
                    rows={3}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div
                    className={`whitespace-pre-wrap ${
                      isCollapsed ? "line-clamp-1" : ""
                    }`}
                  >
                    {m.content}
                  </div>
                )}
              </div>

              <div
                className={`flex gap-1 ${
                  m.role === "user" ? "justify-end" : ""
                }`}
              >
                {m.role === "user" && (
                  <>
                    <button
                      onClick={() => handleResendMessage(m.content)}
                      className={smallIconBtn}
                      style={inputBase}
                      title="Resend"
                    >
                      ↻
                    </button>
                    {isEditing ? (
                      <button
                        onClick={() => handleSaveEdit(i)}
                        className={smallIconBtn}
                        style={{
                          ...inputBase,
                          backgroundColor: themeVars.success,
                          color: "#fff",
                        }}
                        title="Save"
                      >
                        ✓
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartEdit(i, m.content)}
                        className={smallIconBtn}
                        style={inputBase}
                        title="Edit"
                      >
                        ✎
                      </button>
                    )}
                    <button
                      onClick={() => handleCopyMessage(m.content)}
                      className={smallIconBtn}
                      style={inputBase}
                      title="Copy"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(i)}
                      className={smallIconBtn}
                      style={inputBase}
                      title="Delete"
                    >
                      🗑
                    </button>
                  </>
                )}

                {m.role === "assistant" && (
                  <>
                    <button
                      onClick={() => handleRedoMessage(i)}
                      className={smallIconBtn}
                      style={inputBase}
                      title="Redo"
                    >
                      ⟳
                    </button>
                    <button
                      onClick={() => handleCopyMessage(m.content)}
                      className={smallIconBtn}
                      style={inputBase}
                      title="Copy"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(i)}
                      className={smallIconBtn}
                      style={inputBase}
                      title="Delete"
                    >
                      🗑
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
        {isGenerating && (
          <div
            className="max-w-[92%] px-3 py-2 text-sm ai-pulse"
            style={{
              borderWidth: 2,
              borderColor: themeVars.primary,
              background: themeVars.bg,
            }}
          >
            Generating code...
          </div>
        )}
      </div>

      <form
        onSubmit={handleAIGenerate}
        className="p-4 flex gap-2"
        style={{ borderTop: `1px solid ${themeVars.border}` }}
      >
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          className="flex-1 px-3 py-2 text-sm"
          style={inputBase}
          placeholder="Ask AI to modify your code..."
          disabled={isGenerating}
        />
        <button
          type="submit"
          disabled={isGenerating || !chatInput.trim()}
          className={iconBtn}
          style={{
            backgroundColor: themeVars.primary,
            color: "#fff",
            border: `1px solid ${themeVars.primary}`,
            opacity: isGenerating || !chatInput.trim() ? 0.6 : 1,
          }}
          aria-label="Send"
        >
          ➤
        </button>
      </form>
    </aside>
  );
};

export const EditorPanel = ({
  panelStyle,
  editorW,
  themeVars,
  buttonClass,
  activeTab,
  setActiveTab,
  project,
  mergeProject,
  isProjectsOpen,
  projects,
  loadProject,
  setIsProjectsOpen,
}) => {
  return (
    <section
      className="h-full flex flex-col relative"
      style={{
        ...panelStyle,
        width: `${editorW}%`,
        minWidth: 0,
        borderRight: `1px solid ${themeVars.border}`,
      }}
    >
      <div
        className="px-4 py-2 flex items-center gap-2"
        style={{ borderBottom: `1px solid ${themeVars.border}` }}
      >
        {["html", "css", "js"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={buttonClass}
            style={{
              backgroundColor:
                activeTab === t ? themeVars.primary : themeVars.panel,
              color: activeTab === t ? "#fff" : themeVars.text,
              border: `1px solid ${themeVars.border}`,
            }}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden p-4">
        <textarea
          value={project[activeTab] || ""}
          onChange={(e) => mergeProject({ [activeTab]: e.target.value })}
          spellCheck={false}
          className="w-full h-full bg-transparent text-sm"
          style={{
            color: themeVars.text,
            border: `1px solid ${themeVars.border}`,
            backgroundColor: themeVars.bg,
            fontFamily: '"SFMono-Regular", Consolas, Menlo, monospace',
          }}
          placeholder={`Enter ${activeTab.toUpperCase()} here`}
        />
      </div>

      {isProjectsOpen && (
        <div
          className="absolute inset-y-0 right-0 w-[320px] flex flex-col"
          style={{
            backgroundColor: themeVars.panel,
            color: themeVars.text,
            borderLeft: `1px solid ${themeVars.border}`,
          }}
        >
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ borderBottom: `1px solid ${themeVars.border}` }}
          >
            <div className="font-semibold">Projects</div>
            <button
              onClick={() => setIsProjectsOpen(false)}
              className={buttonClass}
              style={{
                backgroundColor: themeVars.danger,
                color: "#fff",
                border: `1px solid ${themeVars.danger}`,
              }}
            >
              Close
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            {projects.length === 0 ? (
              <div className="p-4 text-xs opacity-70">
                No saved projects yet.
              </div>
            ) : (
              <div className="p-2 space-y-2">
                {projects
                  .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
                  .map((p) => (
                    <button
                      key={p._id}
                      onClick={() => loadProject(p)}
                      className="w-full text-left px-3 py-2 text-sm"
                      style={{
                        border: `1px solid ${themeVars.border}`,
                        backgroundColor: themeVars.bg,
                      }}
                    >
                      <div className="font-semibold truncate">
                        {p.title || "Untitled"}
                      </div>
                      <div className="text-[11px]" style={{ opacity: 0.7 }}>
                        {p.updatedAt
                          ? new Date(p.updatedAt).toLocaleString()
                          : ""}
                      </div>
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export const PreviewPanel = ({
  panelStyle,
  previewW,
  themeVars,
  enableElementSelectMode,
  iconBtn,
  inputBase,
  elementSelectMode,
  runPreview,
  previewHTML,
  iframeRef,
  previewKey,
}) => {
  return (
    <section
      className="h-full flex flex-col"
      style={{ ...panelStyle, width: `${previewW}%`, minWidth: 0 }}
    >
      <div
        className="px-4 py-2 flex items-center gap-2"
        style={{ borderBottom: `1px solid ${themeVars.border}` }}
      >
        <div className="text-sm font-semibold">Preview</div>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={enableElementSelectMode}
            className={iconBtn}
            style={{
              ...inputBase,
              borderRadius: 0,
              backgroundColor: elementSelectMode
                ? themeVars.primary
                : themeVars.panel,
              color: elementSelectMode ? "#fff" : themeVars.text,
            }}
            title={
              elementSelectMode
                ? "Disable Element Select (click to turn off)"
                : "Enable Element Select (click to turn on)"
            }
            aria-label="Element Select"
          >
            🎯
          </button>
          <button
            onClick={runPreview}
            className={iconBtn}
            style={{ ...inputBase, borderRadius: 0 }}
            title="Refresh"
            aria-label="Refresh"
          >
            ↻
          </button>
          <button
            onClick={() => {
              try {
                const blob = new Blob([previewHTML], { type: "text/html" });
                const url = URL.createObjectURL(blob);
                window.open(url, "_blank", "noopener,noreferrer");
                setTimeout(() => URL.revokeObjectURL(url), 30000);
              } catch {}
            }}
            className={iconBtn}
            style={{ ...inputBase, borderRadius: 0 }}
            title="Open in new tab"
            aria-label="Open in new tab"
          >
            🗗
          </button>
        </div>
      </div>
      <div className="flex-1">
        <iframe
          ref={iframeRef}
          key={previewKey}
          srcDoc={previewHTML}
          className="w-full h-full"
          sandbox="allow-scripts allow-same-origin"
          title="preview"
        />
      </div>
    </section>
  );
};
