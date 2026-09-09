import React, { useEffect, useState } from 'react';
import { UserProfile, ApplicationStatus } from '../types';
import { subscribeToAllUsers, updateStudentApplication } from '../firebase/services';
import { AU_PAIR_STAGES, AUSBILDUNG_STAGES, PROGRAM_STATUS_MAP } from '../data/programsData';
import { ShieldCheck, Search, Users, Briefcase, GraduationCap, X, Check } from 'lucide-react';

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
    <div id="admin-view" className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto flex flex-col gap-6 font-sans text-[#0B1F3A] dark:text-slate-100 transition-colors">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="font-heading font-bold text-xs uppercase tracking-widest text-[#3B82F6] mb-1.5 flex items-center gap-1.5">
            <ShieldCheck size={14} />
            <span>Административная консоль • Управление программами</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A] dark:text-white tracking-tight">
            Реестр студентов и статус дел
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] font-medium mt-1.5 max-w-2xl leading-relaxed">
            Прямое редактирование этапов визовых заявлений Au-Pair и Ausbildung. Все изменения синхронизируются в реальном времени.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[260px] sm:min-w-[300px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск студента или email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700/80 text-xs text-[#0B1F3A] dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-[#111C2E] focus:ring-2 focus:ring-[#3B82F6]/30 focus:border-[#3B82F6] rounded-xl transition-all"
          />
        </div>
      </div>

      {/* Metrics Row: 3 Rounded Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#3B82F6] flex items-center justify-center shrink-0">
            <Users size={24} />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] font-semibold">Всего зарегистрировано</div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] dark:text-white mt-0.5">{totalStudents} чел.</div>
            <div className="text-xs text-slate-400 mt-0.5">В базе слушателей</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Briefcase size={24} />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] font-semibold">Дел Au-Pair в работе</div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] dark:text-white mt-0.5">{auPairInWork}</div>
            <div className="text-xs text-slate-400 mt-0.5">Активные кураторские дела</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <GraduationCap size={24} />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] font-semibold">Дел Ausbildung в работе</div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] dark:text-white mt-0.5">{ausbildungInWork}</div>
            <div className="text-xs text-slate-400 mt-0.5">Оформление контрактов IHK</div>
          </div>
        </div>
      </div>

      {/* Students Table Card */}
      <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/90 dark:border-slate-800">
          <span className="font-heading font-bold text-base text-[#0B1F3A] dark:text-white">
            Список студентов ({filteredUsers.length})
          </span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Синхронизация активна</span>
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200/90 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#111C2E] text-slate-600 dark:text-slate-300 font-semibold text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">Студент</th>
                <th className="p-3.5">Роль</th>
                <th className="p-3.5">Прогресс A1</th>
                <th className="p-3.5">Au-Pair</th>
                <th className="p-3.5">Ausbildung</th>
                <th className="p-3.5 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">
                    Студенты не найдены.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const auPairStage = AU_PAIR_STAGES.find((s) => s.id === (u.auPairStageId || 1)) || AU_PAIR_STAGES[0];
                  const auPairStatusInfo = PROGRAM_STATUS_MAP[u.auPairStatus || 'not_started'] || PROGRAM_STATUS_MAP.not_started;

                  const ausbildungStage = AUSBILDUNG_STAGES.find((s) => s.id === (u.ausbildungStageId || 1)) || AUSBILDUNG_STAGES[0];
                  const ausbildungStatusInfo = PROGRAM_STATUS_MAP[u.ausbildungStatus || 'not_started'] || PROGRAM_STATUS_MAP.not_started;

                  return (
                    <tr key={u.uid} className="hover:bg-slate-50/80 dark:hover:bg-[#111C2E]/50 transition-colors">
                      <td className="p-3.5">
                        <div className="font-semibold text-sm text-[#0B1F3A] dark:text-white">{u.displayName || 'Без имени'}</div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">{u.email}</div>
                      </td>

                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700">
                          {u.role}
                        </span>
                      </td>

                      <td className="p-3.5 text-slate-700 dark:text-slate-200">
                        <div className="font-semibold">{u.completedLessonsCount || 0} / 23 модулей</div>
                        <div className="text-[11px] text-slate-400">стрик: {u.streakDays || 0} дн.</div>
                      </td>

                      <td className="p-3.5">
                        <div className="font-semibold text-xs text-[#3B82F6]">
                          {auPairStatusInfo.label}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-[#94A3B8] mt-0.5">
                          Этап {auPairStage.number}: {auPairStage.titleRu}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <div className="font-semibold text-xs text-[#0B1F3A] dark:text-slate-200">
                          {ausbildungStatusInfo.label}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-[#94A3B8] mt-0.5">
                          Этап {ausbildungStage.number}: {ausbildungStage.titleRu}
                        </div>
                      </td>

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(u, 'auPair')}
                            className="px-2.5 py-1 bg-white dark:bg-[#111C2E] hover:bg-[#0B1F3A] hover:text-white dark:hover:bg-[#3B82F6] dark:hover:text-white border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-lg transition-colors text-[#0B1F3A] dark:text-white cursor-pointer shadow-xs"
                          >
                            Au-Pair
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(u, 'ausbildung')}
                            className="px-2.5 py-1 bg-white dark:bg-[#111C2E] hover:bg-[#0B1F3A] hover:text-white dark:hover:bg-[#3B82F6] dark:hover:text-white border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-lg transition-colors text-[#0B1F3A] dark:text-white cursor-pointer shadow-xs"
                          >
                            Ausbildung
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Status Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-[#0E1A2D] max-w-lg w-full p-6 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-slate-700 shadow-2xl flex flex-col gap-6 relative font-sans text-xs">
            <button
              type="button"
              onClick={() => setSelectedUser(null)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div>
              <div className="text-xs uppercase tracking-wider text-[#3B82F6] font-bold">
                Редактирование статуса дела
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-[#0B1F3A] dark:text-white mt-1">
                {selectedUser.displayName || selectedUser.email}
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#94A3B8] font-medium mt-1">
                Программа: {editProgram === 'auPair' ? 'Au-Pair в Германии' : 'Ausbildung в Германии'}
              </p>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              {/* Program Selector */}
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
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
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      editProgram === 'auPair'
                        ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white border-transparent shadow-xs'
                        : 'bg-slate-50 dark:bg-[#111C2E] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
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
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      editProgram === 'ausbildung'
                        ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white border-transparent shadow-xs'
                        : 'bg-slate-50 dark:bg-[#111C2E] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Ausbildung (9 этапов)
                  </button>
                </div>
              </div>

              {/* Stage Select */}
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                  Текущий этап документов
                </label>
                <select
                  value={editStageId}
                  onChange={(e) => setEditStageId(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700 p-2.5 text-xs text-[#0B1F3A] dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 focus:border-[#3B82F6]"
                >
                  {(editProgram === 'auPair' ? AU_PAIR_STAGES : AUSBILDUNG_STAGES).map((s) => (
                    <option key={s.id} value={s.id}>
                      Этап {s.number}: {s.titleRu} ({s.titleDe})
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Select */}
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                  Статус рассмотрения
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as ApplicationStatus)}
                  className="w-full bg-slate-50 dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700 p-2.5 text-xs text-[#0B1F3A] dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 focus:border-[#3B82F6]"
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
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                  Служебная записка куратора (видна студенту)
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Документы проверены..."
                  className="w-full bg-slate-50 dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700 p-2.5 text-xs text-[#0B1F3A] dark:text-slate-100 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 focus:border-[#3B82F6]"
                />
              </div>

              {saveSuccess && (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <Check size={16} />
                  <span>Статус сохранен в Firestore</span>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-[#111C2E] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Отмена
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
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
