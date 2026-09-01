import React, { useEffect, useState } from 'react';
import { UserProfile, ApplicationStatus } from '../types';
import { subscribeToAllUsers, updateStudentApplication } from '../firebase/services';
import { AU_PAIR_STAGES, AUSBILDUNG_STAGES, PROGRAM_STATUS_MAP } from '../data/programsData';

export const AdminView: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  // Form states for editing
  const [editProgram, setEditProgram] = useState<'auPair' | 'ausbildung'>('auPair');
  const [editStageId, setEditStageId] = useState<number>(1);
  const [editStatus, setEditStatus] = useState<ApplicationStatus>('in_progress');
  const [editNotes, setEditNotes] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const unsub = subscribeToAllUsers((list) => {
      setUsers(list);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleOpenEdit = (u: UserProfile, program: 'auPair' | 'ausbildung') => {
    setSelectedUser(u);
    setEditProgram(program);
    if (program === 'auPair') {
      setEditStageId(u.auPairStageId || 1);
      setEditStatus(u.auPairStatus || 'not_started');
      setEditNotes(u.auPairNotes || '');
    } else {
      setEditStageId(u.ausbildungStageId || 1);
      setEditStatus(u.ausbildungStatus || 'not_started');
      setEditNotes(u.ausbildungNotes || '');
    }
    setSaveSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    setIsSaving(true);
    try {
      await updateStudentApplication(
        selectedUser.uid,
        editProgram,
        editStageId,
        editStatus,
        editNotes
      );
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setSelectedUser(null);
      }, 1000);
    } catch (err) {
      console.error('Error saving application status:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      u.displayName?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.auPairNotes?.toLowerCase().includes(q) ||
      u.ausbildungNotes?.toLowerCase().includes(q)
    );
  });

  const totalStudents = users.length;
  const auPairInWork = users.filter((u) => u.auPairStatus === 'in_progress' || u.auPairStatus === 'in_review').length;
  const ausbildungInWork = users.filter((u) => u.ausbildungStatus === 'in_progress' || u.ausbildungStatus === 'in_review').length;

  return (
    <div id="admin-view" className="p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-10 font-sans">
      {/* Header Banner */}
      <div className="border-b border-zinc-300 dark:border-zinc-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
            § Административная консоль • Управление базами данных
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-normal text-zinc-950 dark:text-white tracking-tight">
            Реестр студентов и статус дел
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-normal mt-2 max-w-2xl">
            Прямое редактирование этапов визовых заявлений Au-Pair и Ausbildung. Все изменения синхронизируются с Firestore в реальном времени.
          </p>
        </div>

        {/* Search */}
        <div className="font-mono text-xs shrink-0 min-w-[280px]">
          <input
            type="text"
            placeholder="Поиск студента или email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 font-mono text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black dark:focus:border-white rounded-none"
          />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-300 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 font-mono text-xs">
        <div className="bg-white dark:bg-zinc-900 p-6">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Всего зарегистрировано</div>
          <div className="font-serif text-3xl text-zinc-950 dark:text-white font-normal mt-2">{totalStudents} чел.</div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">В базе слушателей</div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Дел Au-Pair в работе</div>
          <div className="font-serif text-3xl text-zinc-950 dark:text-white font-normal mt-2">{auPairInWork}</div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">Активные кураторские дела</div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Дел Ausbildung в работе</div>
          <div className="font-serif text-3xl text-zinc-950 dark:text-white font-normal mt-2">{ausbildungInWork}</div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">Оформление контрактов IHK</div>
        </div>
      </div>

      {/* Students Table */}
      <div className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8 flex flex-col gap-6 transition-colors">
        <div className="flex items-center justify-between font-mono text-xs pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <span className="font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
            [Список студентов ({filteredUsers.length})]
          </span>
          <span className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase">
            Синхронизация Firestore: OK
          </span>
        </div>

        <div className="border border-zinc-300 dark:border-zinc-800 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead className="bg-[#FAFAFA] dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase text-[10px] border-b border-zinc-300 dark:border-zinc-700">
              <tr>
                <th className="p-3.5 border-r border-zinc-300 dark:border-zinc-700">Студент</th>
                <th className="p-3.5 border-r border-zinc-300 dark:border-zinc-700">Роль</th>
                <th className="p-3.5 border-r border-zinc-300 dark:border-zinc-700">Прогресс A1</th>
                <th className="p-3.5 border-r border-zinc-300 dark:border-zinc-700">Au-Pair</th>
                <th className="p-3.5 border-r border-zinc-300 dark:border-zinc-700">Ausbildung</th>
                <th className="p-3.5 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredUsers.map((u) => {
                const auPairStage = AU_PAIR_STAGES.find((s) => s.id === (u.auPairStageId || 1)) || AU_PAIR_STAGES[0];
                const auPairStatusInfo = PROGRAM_STATUS_MAP[u.auPairStatus || 'not_started'] || PROGRAM_STATUS_MAP.not_started;

                const ausbildungStage = AUSBILDUNG_STAGES.find((s) => s.id === (u.ausbildungStageId || 1)) || AUSBILDUNG_STAGES[0];
                const ausbildungStatusInfo = PROGRAM_STATUS_MAP[u.ausbildungStatus || 'not_started'] || PROGRAM_STATUS_MAP.not_started;

                return (
                  <tr key={u.uid} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors">
                    <td className="p-3.5 border-r border-zinc-200 dark:border-zinc-800">
                      <div className="font-bold text-zinc-950 dark:text-white font-sans">{u.displayName || 'Без имени'}</div>
                      <div className="text-[10px] text-zinc-400 dark:text-zinc-500">{u.email}</div>
                    </td>

                    <td className="p-3.5 border-r border-zinc-200 dark:border-zinc-800">
                      <span className="px-1.5 py-0.5 border border-zinc-300 dark:border-zinc-700 text-[10px] uppercase text-zinc-800 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800">
                        {u.role}
                      </span>
                    </td>

                    <td className="p-3.5 border-r border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200">
                      <div className="font-bold">{u.completedLessonsCount || 0} / 23 модулей</div>
                      <div className="text-[10px] text-zinc-400 dark:text-zinc-500">стрик: {u.streakDays || 0} дн.</div>
                    </td>

                    <td className="p-3.5 border-r border-zinc-200 dark:border-zinc-800">
                      <div className="font-bold uppercase text-[10px] text-[#0033CC] dark:text-blue-400">
                        {auPairStatusInfo.label}
                      </div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                        Этап 0{auPairStage.number}: {auPairStage.titleRu}
                      </div>
                    </td>

                    <td className="p-3.5 border-r border-zinc-200 dark:border-zinc-800">
                      <div className="font-bold uppercase text-[10px] text-zinc-800 dark:text-zinc-200">
                        {ausbildungStatusInfo.label}
                      </div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                        Этап 0{ausbildungStage.number}: {ausbildungStage.titleRu}
                      </div>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5 font-mono text-[10px]">
                        <button
                          onClick={() => handleOpenEdit(u, 'auPair')}
                          className="px-2 py-1 bg-white dark:bg-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-zinc-300 dark:border-zinc-700 uppercase transition-colors text-zinc-900 dark:text-white cursor-pointer"
                        >
                          Au-Pair
                        </button>
                        <button
                          onClick={() => handleOpenEdit(u, 'ausbildung')}
                          className="px-2 py-1 bg-white dark:bg-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-zinc-300 dark:border-zinc-700 uppercase transition-colors text-zinc-900 dark:text-white cursor-pointer"
                        >
                          Ausbildung
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Status Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 max-w-lg w-full p-8 border border-black dark:border-zinc-700 shadow-2xl flex flex-col gap-6 relative font-sans">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute right-4 top-4 font-mono text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 cursor-pointer"
            >
              [Закрыть]
            </button>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                [Редактирование статуса дела]
              </div>
              <h3 className="font-serif text-2xl text-zinc-950 dark:text-white font-normal mt-1">
                {selectedUser.displayName || selectedUser.email}
              </h3>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Программа: {editProgram === 'auPair' ? 'Au-Pair в Германии' : 'Ausbildung в Германии'}
              </p>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4 font-mono text-xs">
              {/* Program Selector */}
              <div>
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                  Программа
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditProgram('auPair');
                      setEditStageId(selectedUser.auPairStageId || 1);
                      setEditStatus(selectedUser.auPairStatus || 'not_started');
                      setEditNotes(selectedUser.auPairNotes || '');
                    }}
                    className={`py-2 px-3 text-xs uppercase border transition-colors cursor-pointer ${
                      editProgram === 'auPair'
                        ? 'bg-black dark:bg-zinc-100 text-white dark:text-zinc-950 border-black dark:border-zinc-100 font-bold'
                        : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
                    }`}
                  >
                    Au-Pair (8 этапов)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditProgram('ausbildung');
                      setEditStageId(selectedUser.ausbildungStageId || 1);
                      setEditStatus(selectedUser.ausbildungStatus || 'not_started');
                      setEditNotes(selectedUser.ausbildungNotes || '');
                    }}
                    className={`py-2 px-3 text-xs uppercase border transition-colors cursor-pointer ${
                      editProgram === 'ausbildung'
                        ? 'bg-black dark:bg-zinc-100 text-white dark:text-zinc-950 border-black dark:border-zinc-100 font-bold'
                        : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
                    }`}
                  >
                    Ausbildung (9 этапов)
                  </button>
                </div>
              </div>

              {/* Stage Select */}
              <div>
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                  Текущий этап документов
                </label>
                <select
                  value={editStageId}
                  onChange={(e) => setEditStageId(Number(e.target.value))}
                  className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 p-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-black dark:focus:border-white rounded-none"
                >
                  {(editProgram === 'auPair' ? AU_PAIR_STAGES : AUSBILDUNG_STAGES).map((s) => (
                    <option key={s.id} value={s.id}>
                      Этап 0{s.number}: {s.titleRu} ({s.titleDe})
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Select */}
              <div>
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                  Статус рассмотрения
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as ApplicationStatus)}
                  className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 p-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-black dark:focus:border-white rounded-none"
                >
                  <option value="not_started">Не начато</option>
                  <option value="in_review">На проверке у куратора</option>
                  <option value="in_progress">В процессе</option>
                  <option value="changes_requested">Требуются правки / доработка</option>
                  <option value="approved">Одобрено</option>
                  <option value="completed">Завершено успешно</option>
                </select>
              </div>

              {/* Coordinator Notes */}
              <div>
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                  Служебная записка куратора (видна студенту)
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Документы проверены..."
                  className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 p-2.5 text-xs font-sans text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black dark:focus:border-white rounded-none"
                />
              </div>

              {saveSuccess && (
                <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white p-2.5 border border-zinc-300 dark:border-zinc-700 text-xs font-bold uppercase">
                  [OK] Статус сохранен в Firestore
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 uppercase border border-zinc-300 dark:border-zinc-700 cursor-pointer"
                >
                  Отмена
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-black dark:bg-blue-600 hover:bg-[#0033CC] dark:hover:bg-blue-500 text-white uppercase font-bold border border-black dark:border-blue-500 transition-colors cursor-pointer"
                >
                  {isSaving ? 'Сохранение...' : 'Сохранить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
