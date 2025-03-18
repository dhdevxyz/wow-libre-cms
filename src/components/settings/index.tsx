import React, { useState } from "react";
import CardSettings from "./card";

type ServerSettings = {
  [key: string]: string;
};

type SectionedSettings = {
  auth: ServerSettings;
  worldserver: ServerSettings;
};

const initialData: SectionedSettings = {
  auth: {
    EnableProxyProtocol: "0",
    "LoginDatabase.SynchThreads": "1",
    MaxPingTime: "30",
    PidFile: "",
    "Updates.AutoSetup": "1",
    "Appender.Auth": "2,5,0,Auth.log,w",
    RealmServerPort: "3724",
    BanExpiryCheckInterval: "60",
    AllowLoggingIPAddressesInDatabase: "1",
    "Updates.Redundancy": "1",
    RealmsStateUpdateDelay: "20",
    "WrongPass.BanType": "0",
    MySQLExecutable: "",
    "Database.Reconnect.Attempts": "20",
    "Updates.ArchivedRedundancy": "0",
    LoginDatabaseInfo: "127.0.0.1;3306;root;Wowlibre96@@;acore_auth",
    TOTPMasterSecret: "",
    LogsDir: "",
  },
  worldserver: {
    PreloadAllNonInstancedMapGrids: "0",
    "Appender.Errors": "2,5,0,Errors.log",
    "StrictNames.Reserved": "1",
    "Rate.Damage.Fall": "1",
    GameType: "0",
    "StrictNames.Profanity": "1",
    PreserveCustomChannels: "0",
    PreventAFKLogout: "0",
    MonsterSight: "50.000000",
    "Database.Reconnect.Attempts": "20",
    "Arena.PreviousOpponentsDiscardTimer": "120000",
    LoginDatabaseInfo: "127.0.0.1;3306;root;Wowlibre96@@;acore_auth",
    AlwaysMaxWeaponSkill: "0",
    BirthdayTime: "1222964635",
    "vmap.petLOS": "1",
    "Battleground.RewardLoserHonorFirst": "5",
    "CharacterCreating.Disabled.ClassMask": "0",
    Expansion: "2",
    "DungeonAccessRequirements.OptionalStringID": "0",
    "Die.Command.Mode": "1",
    InstantLogout: "1",
    "ChatLevelReq.Say": "1",
    "Visibility.ObjectQuestMarkers": "1",
    "Warden.ClientCheckHoldOff": "30",
    "Guild.ResetHour": "6",
    "ICC.Buff.Horde": "73822",
    "Rate.Drop.Item.Uncommon": "1",
    "vmap.BlizzlikePvPLOS": "1",
    "CharacterCreating.MinLevelForHeroicCharacter": "55",
    "GM.TicketSystem.ChanceOfGMSurvey": "50",
    AllowTickets: "1",
    InstantFlightPaths: "0",
    "Group.Raid.LevelRestriction": "10",
    EnableLowLevelRegenBoost: "1",
    "Calculate.Creature.Zone.Area.Data": "0",
    "SkillGain.Weapon": "1",
    MaxCoreStuckTime: "0",
    "Death.Bones.World": "1",
    "AllowTwoSide.Interaction.Arena": "0",
    "Battleground.QueueAnnouncer.Limit.MinPlayers": "3",
    RealmID: "1",
    SocketTimeOutTime: "900000",
    HeroicCharactersPerRealm: "1",
    "Creatures.CustomIDs": "190010,55005,999991,25462,98888,601014,34567,34568",
    "vmap.BlizzlikeLOSInOpenWorld": "1",
    MapUpdateInterval: "10",
    "Rate.MoveSpeed": "1",
    "Stats.Limits.Dodge": "95.0",
    "Arena.ArenaLoseRatingModifier": "24",
    "AllowTwoSide.Interaction.Calendar": "0",
    "Updates.EnableDatabases": "7",
    "Quests.EnableQuestTracker": "0",
    "Rate.SellValue.Item.Normal": "1",
    "Channel.RestrictedLfg": "1",
    "Wintergrasp.NoBattleTimer": "150",
    "Instance.ResetTimeHour": "4",
    "Battleground.PrematureFinishTimer": "300000",
    "Updates.AutoSetup": "1",
    "PlayerDump.DisallowOverwrite": "1",
    "Updates.ArchivedRedundancy": "0",
    "Battleground.InvitationType": "0",
    "Logger.root": "2,Console Server",
    "PacketSpoof.Policy": "1",
    "ItemDelete.ItemLevel": "80",
    "Rate.Creature.Elite.WORLDBOSS.HP": "1",
    "Wintergrasp.CrashRestartTimer": "10",
    "World.RealmAvailability": "1",
    "Guild.BankTabCost1": "2500000",
    "Guild.BankTabCost2": "5000000",
    "Guild.BankTabCost0": "1000000",
    "WorldDatabase.WorkerThreads": "1",
    "Logger.spells.scripts": "2,Console Errors",
    "LevelReq.Auction": "1",
    "Rate.XP.BattlegroundKillIC": "1",
    "Guild.BankTabCost5": "50000000",
    "Guild.BankTabCost3": "10000000",
    "ChatFlood.MessageCount": "10",
    "Guild.BankTabCost4": "25000000",
    "Death.SicknessLevel": "11",
    "Rate.Creature.Elite.RAREELITE.SpellDamage": "1",
    "WorldDatabase.SynchThreads": "1",
    "LogDB.Opt.ClearTime": "1209600",
    "PlayerSave.Stats.SaveOnlyOnLogout": "1",
    "ChatFlood.MuteTime": "10",
    "Rate.BuyValue.Item.Legendary": "1",
    "PacketSpoof.BanMode": "0",
    "GM.AllowInvite": "0",
    "Battleground.RewardWinnerArenaFirst": "25",
    MinRecordUpdateTimeDiff: "100",
    "Rate.Rest.Offline.InWilderness": "1",
    "PlayerStart.MapsExplored": "0",
    "Rate.Creature.Elite.RARE.HP": "1",
    WaypointMovementStopTimeForPlayer: "120",
    "Rate.BuyValue.Item.Normal": "1",
    "Arena.RatingDiscardTimer": "600000",
    "Guild.CharterCost": "1000",
    BindIP: "0.0.0.0",
    "Warden.BanDuration": "86400",
    "Wintergrasp.PlayerMax": "100",
    "Guild.AllowMultipleGuildMaster": "0",
    PartyLevelReq: "1",
    "SkillChance.Yellow": "75",
    "Rate.Creature.Aggro": "1",
    "Console.Enable": "1",
    "Instance.ResetTimeRelativeTimestamp": "1135814400",
    StartHeroicPlayerLevel: "55",
    MaxPrimaryTradeSkill: "2",
    "Appender.Server": "2,5,0,Server.log,w",
    "DungeonAccessRequirements.LFGLevelDBCOverride": "0",
    "QuestPOI.Enabled": "1",
    "Updates.AllowRehash": "1",
    SaveRespawnTimeImmediately: "1",
    MinDualSpecLevel: "40",
    "Rate.Creature.Normal.Damage": "1",
    "Rate.Auction.Cut": "1",
    "ChatFlood.MessageDelay": "1",
    StartArenaPoints: "0",
    "ItemDelete.Vendor": "0",
    "Network.OutUBuff": "4096",
    "Logger.module": "4,Console Server",
    "DurabilityLossChance.Parry": "0.05",
    "PvPToken.ItemID": "29434",
    "RecruitAFriend.MaxLevel": "60",
    "GM.LoginState": "2",
    TeleportTimeoutNear: "25",
    "Visibility.Distance.Continents": "100",
    MinWorldUpdateTime: "1",
    MySQLExecutable: "",
    "Ra.Port": "3443",
    DontCacheRandomMovementPaths: "0",
    "Battleground.ReportAFK": "3",
    "Arena.AutoDistributeInterval": "7",
    "Network.Threads": "1",
    "WaterBreath.Timer": "180000",
    "RecruitAFriend.MaxDifference": "4",
    "Instance.IgnoreLevel": "0",
    "Rate.SellValue.Item.Poor": "1",
    "AllowTwoSide.AddFriend": "0",
    TeleportTimeoutFar: "45",
    "Rate.Honor": "1",
    "CharacterDatabase.SynchThreads": "1",
    FFAPvPTimer: "30",
    NpcRegenHPTimeIfTargetIsUnreachable: "10",
    "Rate.InstanceResetTime": "1",
    "Rate.ArenaPoints": "1",
    "Creature.MovingStopTimeForPlayer": "180000",
    "Instance.IgnoreRaid": "0",
    "AllowTwoSide.Interaction.Mail": "0",
    "Battleground.TrackDeserters.Enable": "0",
    "Rate.Pet.LevelXP": "0.05",
    MinPetitionSigns: "9",
    "GM.Visible": "2",
    "Metric.OverallStatusInterval": "1",
    "Battleground.BerserkingBuffRespawn": "120",
    "Arena.QueueAnnouncer.Enable": "0",
    PidFile: "",
    ThreadPool: "2",
    "Rate.Drop.Item.Artifact": "1",
    "SOAP.Enabled": "1",
    "Pet.RankMod.Health": "1",
    "GM.LowerSecurity": "0",
    "Stats.Limits.Crit": "95.0",
    CMakeCommand: "",
    "Command.LookupMaxResults": "0",
    DataDir: ".",
    SocketTimeOutTimeActive: "60000",
    BeepAtStart: "1",
    CheckGameObjectLoS: "1",
    "ArenaTeam.CharterCost.2v2": "800000",
    "Arena.ArenaStartRating": "0",
    "Quests.LowLevelHideDiff": "4",
    "CharacterCreating.Disabled.RaceMask": "0",
    "Calculate.Gameoject.Zone.Area.Data": "0",
    "WipeGunshipBlizzlike.Enable": "1",
    "Rate.BuyValue.Item.Poor": "1",
    "Instance.UnloadDelay": "1800000",
    "Rate.SellValue.Item.Artifact": "1",
    "vmap.enableIndoorCheck": "1",
    "PlayerDump.DisallowPaths": "1",
    "Rate.Creature.Elite.WORLDBOSS.SpellDamage": "1",
    "Corpse.Decay.RARE": "300",
    "Network.EnableProxyProtocol": "0",
    Compression: "1",
    "Rate.Creature.Elite.WORLDBOSS.Damage": "1",
    "Logger.scripts.hotswap": "4,Console Server",
    "CharDelete.MinLevel": "0",
    "Rate.Drop.Money": "1",
    StartPlayerMoney: "0",
    "Visibility.GroupMode": "1",
    "Arena.ArenaStartMatchmakerRating": "1500",
    AllowLoggingIPAddressesInDatabase: "1",
    "ChatStrictLinkChecking.Severity": "0",
    "Ra.IP": "0.0.0.0",
    "Battleground.Random.ResetHour": "6",
    "CharDelete.Method": "0",
    "Rate.MissChanceMultiplier.OnlyAffectsPlayer": "0",
    "MoveMaps.Enable": "1",
    "Arena.ArenaStartPersonalRating": "0",
    "SkillGain.Crafting": "1",
    "SkillGain.Gathering": "1",
    "vmap.enableHeight": "1",
    "Rate.SellValue.Item.Rare": "1",
    "Battleground.RestorationBuffRespawn": "20",
    EnablePlayerSettings: "0",
    "AllowTwoSide.Interaction.Group": "0",
    "Rate.Creature.Elite.RAREELITE.Damage": "1",
    "IsPreloadedContinentTransport.Enabled": "0",
    "GM.StartLevel": "1",
    "LFG.Location.All": "0",
    "Ra.Enable": "0",
    "ArenaTeam.CharterCost.3v3": "1200000",
    "AllowTwoSide.Accounts": "1",
    "Warden.NumOtherChecks": "7",
    ChatFakeMessagePreventing: "1",
    NpcEvadeIfTargetIsUnreachable: "5",
    EnableLoginAfterDC: "1",
    "ChangeFaction.MaxMoney": "0",
    "Rate.Auction.Time": "1",
    "CharacterCreating.Disabled": "0",
    "Rate.Drop.Item.Referenced": "1",
    "Arena.QueueAnnouncer.Detail": "3",
    DeletedCharacterTicketTrace: "0",
    RealmZone: "1",
    "Channel.SilentlyGMJoin": "0",
    "Wintergrasp.PlayerMin": "0",
    "Battleground.QueueAnnouncer.Limit.MinLevel": "0",
    "DungeonFinder.OptionsMask": "5",
    "Metric.ConnectionInfo": "127.0.0.1;8086;worldserver",
    "Chat.MuteFirstLogin": "0",
    "Wintergrasp.PlayerMinLvl": "77",
    "Channel.ModerationGMLevel": "1",
    "Rate.Loyalty": "1",
    MaxWhoListReturns: "49",
    TempDir: "",
    "PlayerStart.String": "",
    "Battleground.RewardWinnerHonorLast": "15",
    "Minigob.Manabonk.Enable": "1",
    "Rate.Drop.Item.Legendary": "1",
    "Rate.Reputation.Gain": "1",
    HonorPointsAfterDuel: "0",
    "Rate.Drop.Item.Epic": "1",
    SessionAddDelay: "10000",
    CreatureFamilyAssistanceDelay: "2000",
    "Rate.BuyValue.Item.Rare": "1",
    "Appender.Console": '1,4,0,"1 9 3 6 5 8',
    CloseIdleConnections: "1",
    "AutoBroadcast.Timer": "6000",
    "AllowTwoSide.Interaction.Channel": "0",
    "Rate.Creature.Elite.Elite.SpellDamage": "1",
    "Battleground.DisableReadyCheckInBG": "0",
    "Visibility.Distance.BGArenas": "250",
    "Rate.Creature.Elite.RAREELITE.HP": "1",
    "PlayerStart.AllReputation": "0",
    "Rate.Skill.Discovery": "1",
    "Rate.Reputation.RecruitAFriendBonus": "0.1",
    "Rate.Drop.Item.GroupAmount": "1",
    MinPetName: "2",
    "Instance.SharedNormalHeroicId": "1",
    PlayerSaveInterval: "2000",
    "LFG.MaxKickCount": "2",
    "Rate.XP.Explore": "1",
    "Arena.ArenaMatchmakerRatingModifier": "24",
    "Updates.Redundancy": "1",
    "Warden.NumLuaChecks": "1",
    "Rate.RunicPower.Loss": "1",
    "Stats.Limits.Enable": "0",
    "Rate.BuyValue.Item.Epic": "1",
    "Quests.IgnoreAutoComplete": "0",
    "Arena.ArenaSeason.ID": "8",
    "Rate.Energy": "1",
    "ListenRange.TextEmote": "40",
    WorldServerPort: "8085",
    "DurabilityLossChance.Absorb": "0.5",
    CreatureFamilyFleeDelay: "7000",
    "Rate.Talent.Pet": "1",
    "PlayerStart.CustomSpells": "0",
    MaxHonorPoints: "75000",
    "Logger.sql.sql": "2,Console Errors",
    "Corpse.Decay.RAREELITE": "300",
    "Wintergrasp.BattleTimer": "30",
    "Daze.Enabled": "1",
    StartHeroicPlayerMoney: "2000",
    "LevelReq.Ticket": "1",
    DisableWaterBreath: "4",
    "Rate.Rest.InGame": "1",
    "Rate.SellValue.Item.Uncommon": "1",
    LootNeedBeforeGreedILvlRestriction: "70",
    "ArenaTeam.CharterCost.5v5": "2000000",
    "Quests.IgnoreAutoAccept": "0",
    "Event.Announce": "0",
    "CharacterDatabase.WorkerThreads": "1",
    "LoginDatabase.SynchThreads": "1",
    "Rate.XP.Pet": "1",
    CreatureFamilyAssistanceRadius: "10",
    "DungeonAccessRequirements.PortalAvgIlevelCheck": "0",
    "Rate.XP.Quest.DF": "1",
    "Death.CorpseReclaimDelay.PvE": "1",
    "Death.CorpseReclaimDelay.PvP": "1",
    "Rate.SellValue.Item.Legendary": "1",
    "Rate.Creature.Normal.SpellDamage": "1",
    "Guild.EventLogRecordsCount": "100",
    TalentsInspecting: "1",
    "MapUpdate.Threads": "1",
    "Guild.BankEventLogRecordsCount": "25",
    "Battleground.RewardWinnerHonorFirst": "30",
    "Battleground.GiveXPForKills": "0",
    "DBC.EnforceItemAttributes": "1",
    SetAllCreaturesWithWaypointMovementActive: "0",
    MinCharterName: "2",
    "Arena.QueueAnnouncer.PlayerOnly": "0",
    "Logger.server": "4,Console Server",
    "PlayerSave.Stats.MinLevel": "0",
    CreatureFamilyAssistancePeriod: "3000",
    "Rate.Creature.Normal.HP": "1",
    "Log.Async.Enable": "0",
    "GM.Chat": "2",
    StrictCharterNames: "0",
    UseProcessors: "0",
    "Rate.Drop.Item.Normal": "1",
    "SkillChance.Green": "25",
    "Rate.RepairCost": "1",
    "Visibility.Distance.Instances": "170",
    "ItemDelete.Method": "0",
    "AutoBroadcast.MinDisableLevel": "0",
    RecordUpdateTimeDiffInterval: "300000",
    "CharDelete.KeepDays": "30",
    "AllowTwoSide.Trade": "0",
    "Arena.LegacyArenaPoints": "0",
    "Rate.Reputation.LowLevel.Kill": "1",
    "Arena.AutoDistributePoints": "0",
    "AllowTwoSide.Interaction.Emote": "0",
    "AutoBroadcast.Center": "0",
    "ListenRange.Yell": "300",
    CharactersPerAccount: "50",
    DetectPosCollision: "1",
    "Warden.ClientResponseDelay": "600",
    "Rate.XP.BattlegroundKillSOTA": "1",
    "Quests.IgnoreRaid": "0",
    "Rate.Focus": "1",
    TOTPMasterSecret: "",
    "Rate.Corpse.Decay.Looted": "0.5",
    "PacketSpoof.BanDuration": "86400",
    "SkillGain.Defense": "1",
    "Rate.Auction.Deposit": "1",
    "Network.OutKBuff": "-1",
    MaxOverspeedPings: "2",
    "AutoBroadcast.On": "1",
    MaxHonorPointsMoneyPerPoint: "0",
    StartPlayerLevel: "1",
    "LoginDatabase.WorkerThreads": "1",
    "AllowTwoSide.WhoList": "0",
    "DurabilityLossChance.Block": "0.05",
    "Battleground.QueueAnnouncer.Enable": "0",
    "ChatLevelReq.Whisper": "1",
    AccountInstancesPerHour: "5",
    "Battleground.QueueAnnouncer.SpamProtection.Delay": "30",
    "Battleground.QueueAnnouncer.PlayerOnly": "0",
    PlayerLimit: "1000",
    "ToggleXP.Cost": "100000",
    "SkillChance.Prospecting": "0",
    "Instance.GMSummonPlayer": "0",
    "ICC.Buff.Alliance": "73828",
    CharacterDatabaseInfo: "127.0.0.1;3306;root;Wowlibre96@@;acore_characters",
    NoResetTalentsCost: "0",
    UpdateUptimeInterval: "1",
    "Guild.BankInitialTabs": "0",
    "JoinBGAndLFG.Enable": "0",
    OffhandCheckAtSpellUnlearn: "1",
    AlwaysMaxSkillForLevel: "0",
    "PvPToken.MapAllowType": "4",
    "Rate.XP.Quest": "1",
    "Rate.Drop.Item.Poor": "1",
    "Calendar.DeleteOldEventsHour": "6",
    "Logger.mmaps": "4,Server",
    "Rate.Health": "1",
    "SkillChance.MiningSteps": "0",
    "Guild.MemberLimit": "0",
    "Battleground.RewardWinnerArenaLast": "0",
    "Battleground.RewardLoserHonorLast": "5",
    PreserveCustomChannelDuration: "14",
    PersistentCharacterCleanFlags: "0",
    "Rate.Creature.Elite.RARE.Damage": "1",
    "Rate.BuyValue.Item.Artifact": "1",
    AllFlightPaths: "0",
    "Server.LoginInfo": "0",
    "Corpse.Decay.NORMAL": "60",
    "Allow.IP.Based.Action.Logging": "0",
    IPLocationFile: "",
    "Rate.Rage.Income": "1",
    "Rate.MissChanceMultiplier.TargetPlayer": "7",
    "Battleground.PremadeGroupWaitForMatch": "1800000",
    "Stats.Limits.Parry": "95.0",
    "Warden.Enabled": "1",
    "Corpse.Decay.WORLDBOSS": "3600",
    "Item.SetItemTradeable": "1",
    "Rate.BuyValue.Item.Heirloom": "1",
    "SkillChance.SkinningSteps": "0",
    "Logger.sql": "4,Console Server",
    "DurabilityLoss.OnDeath": "10",
    "Rate.Drop.Item.ReferencedAmount": "1",
    "Logger.time.update": "4,Console Server",
    "Rate.Mana": "1",
    AllowPlayerCommands: "1",
    "Corpse.Decay.ELITE": "300",
    "Rate.MissChanceMultiplier.TargetCreature": "11",
    "Warden.ClientCheckFailAction": "0",
    "DungeonAccessRequirements.PrintMode": "1",
    SkipCinematics: "0",
    MaxGroupXPDistance: "74",
    AddonChannel: "1",
    MaxPlayerLevel: "80",
    "Battleground.PlayerRespawn": "30",
    "SkillChance.Grey": "0",
    "Metric.Interval": "1",
    "Rate.RunicPower.Income": "1",
    "LevelReq.Mail": "1",
    "Battleground.QueueAnnouncer.Timer": "30000",
    ProcessPriority: "1",
    "MunchingBlizzlike.Enabled": "1",
    "AllowTwoSide.Interaction.Guild": "0",
    "LogDB.Opt.ClearInterval": "10",
    DisconnectToleranceInterval: "0",
    ShowBanInWorld: "0",
    "Battleground.QueueAnnouncer.Timed": "0",
    "Warden.NumMemChecks": "3",
    "Rate.Rage.Loss": "1",
    MaxAllowedMMRDrop: "500",
    "Database.Reconnect.Seconds": "15",
    "Debug.Battleground": "0",
    "AllowTwoSide.Interaction.Chat": "0",
    ShowKickInWorld: "0",
    StrictPetNames: "0",
    "SOAP.IP": "127.0.0.1",
    "GM.AllowFriend": "0",
    "Rate.XP.BattlegroundKillAV": "1",
    "SkillChance.Orange": "100",
    "Rate.Drop.Item.Rare": "1",
    "Wintergrasp.Enable": "1",
    "Rate.XP.BattlegroundKillAB": "1",
    "Battleground.StoreStatistics.Enable": "0",
    "Rate.XP.Kill": "1",
    "Visibility.ObjectSparkles": "1",
    "DurabilityLossChance.Damage": "0.5",
    "GM.InGMList.Level": "3",
    "Rate.Creature.Elite.Elite.Damage": "1",
    "Rate.SellValue.Item.Heirloom": "1",
    CharactersPerRealm: "10",
    "DBC.Locale": "255",
    StartHonorPoints: "0",
    "Logger.diff": "3,Console Server",
    "Rate.Creature.Elite.Elite.HP": "1",
    "SOAP.Port": "7878",
    "Arena.ArenaSeason.InProgress": "1",
    WorldDatabaseInfo: "127.0.0.1;3306;root;Wowlibre96@@;acore_world",
    "Death.Bones.BattlegroundOrArena": "1",
    "Stats.Limits.Block": "95.0",
    "Arena.GamesRequired": "10",
    DeclinedNames: "0",
    ActivateWeather: "1",
    BuildDirectory: "",
    "GM.InWhoList.Level": "3",
    StrictPlayerNames: "0",
    "Rate.Talent": "1",
    ShowMuteInWorld: "0",
    LogsDir: "",
    "AuctionHouse.SearchTimeout": "1000",
    MinPlayerName: "2",
    "Rate.BuyValue.Item.Uncommon": "1",
    "ChatFlood.AddonMessageCount": "100",
    "ListenRange.Say": "40",
    CleanCharacterDB: "0",
    "PvPToken.ItemCount": "1",
    "Quests.HighLevelHideDiff": "7",
    "Battleground.CastDeserter": "1",
    "LevelReq.Trade": "1",
    CreatureFamilyFleeAssistanceRadius: "30",
    "Ra.MinLevel": "3",
    "DurabilityLoss.InPvP": "0",
    "Arena.ArenaWinRatingModifier1": "48",
    FlashAtStart: "1",
    "ItemDelete.Quality": "3",
    "Arena.ArenaWinRatingModifier2": "24",
    "DailyRBGArenaPoints.MinLevel": "71",
    "Updates.CleanDeadRefMaxCount": "3",
    "AllowTwoSide.Interaction.Auction": "0",
    SourceDirectory: "",
    "Rate.XP.BattlegroundKillEOTS": "1",
    "SkillChance.Milling": "0",
    "PvPToken.Enable": "0",
    "Rate.XP.BattlegroundKillWSG": "1",
    "ChatLevelReq.Channel": "1",
    ChangeWeatherInterval: "600000",
    MaxRecruitAFriendBonusDistance: "100",
    "Rate.Rest.Offline.InTavernOrCity": "1",
    "Battleground.ReportAFK.Timer": "4",
    MaxPingTime: "30",
    ClientCacheVersion: "0",
    "LeaveGroupOnLogout.Enabled": "0",
    "DungeonFinder.CastDeserter": "1",
    "Metric.Enable": "0",
    MaxArenaPoints: "10000",
    "LFG.KickPreventionTimer": "900",
    "Debug.Arena": "0",
    NpcRegenHPIfTargetIsUnreachable: "1",
    StrictChannelNames: "0",
    "Battleground.SpeedBuffRespawn": "150",
    "ChatFlood.AddonMessageDelay": "1",
    "Arena.MaxRatingDifference": "150",
    MailDeliveryDelay: "3600",
    PacketLogFile: "",
    "Rate.RewardQuestMoney": "1",
    "Chat.MuteTimeFirstLogin": "120",
    "Rate.RewardBonusMoney": "1",
    "vmap.enableLOS": "1",
    "ChatStrictLinkChecking.Kick": "0",
    WorldBossLevelDiff: "3",
    "Battleground.DisableQuestShareInBG": "0",
    "Rate.Reputation.LowLevel.Quest": "1",
    "Rate.Creature.Elite.RARE.SpellDamage": "1",
    "Rate.SellValue.Item.Epic": "1",
    "GM.WhisperingTo": "2",
    "Network.TcpNodelay": "1",
    "IsContinentTransport.Enabled": "1",
  },
};

const SettingsServer = () => {
  const [formData, setFormData] = useState<SectionedSettings>(initialData);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleChange = (
    section: "auth" | "worldserver",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [name]: value,
      },
    }));
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Settings:", formData);
  };

  return (
    <div className="m-10 rounded-xl p-8 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 min-h-screen text-white flex flex-col items-center space-y-6">
      {/* ✅ Sección Introductoria */}
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl font-bold text-indigo-400">
          Dashboard del Servidor
        </h1>
        <p className="text-lg text-gray-300 mt-3">
          Aquí puedes monitorear el estado de los servicios principales,
          administrar configuraciones y asegurarte de que todo funcione
          correctamente.
        </p>
      </div>

      {/* ✅ Contenedor de Tarjetas */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 
  gap-6 w-full max-w-7xl px-8 justify-center pt-10 pb-20"
      >
        <CardSettings
          title="Servidor"
          value={1}
          percentage={100}
          color="border-blue-500"
          btnText="Reiniciar"
        />

        <CardSettings
          title="AuthServer"
          value={1}
          percentage={25}
          color="border-green-500"
          btnText="Reiniciar"
        />
        <CardSettings
          title="WorldServer"
          value={1}
          percentage={25}
          color="border-red-500"
          btnText="Reiniciar"
        />
      </div>
      {/* ✅ Contenedor de Configuración */}
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-7xl max-h-[80vh] overflow-y-auto mt-40">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">
          Configuración del Servidor
        </h2>

        <p className="text-gray-300 text-center mb-6 text-2xl">
          Modifica la configuración de los diferentes módulos del servidor. Los
          cambios serán aplicados en tiempo real.
        </p>

        {Object.keys(formData).map((section) => (
          <div key={section} className="mt-6 bg-gray-700 rounded-lg shadow-lg">
            {/* Botón de despliegue */}
            <button
              type="button"
              onClick={() => toggleSection(section)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-all flex justify-between items-center shadow-md"
            >
              <span className="font-semibold">{section.toUpperCase()}</span>
              <span className="transition-transform duration-300">
                {openSection === section ? "▲" : "▼"}
              </span>
            </button>

            {/* Campos de Configuración */}
            {openSection === section && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-gray-700 mt-3 rounded-lg shadow-lg transition-all">
                {Object.keys(formData[section as "auth" | "worldserver"]).map(
                  (key) => (
                    <div key={key} className="flex flex-col">
                      <label className="font-medium text-gray-300 mb-2 truncate">
                        {key}
                      </label>
                      <input
                        type="text"
                        name={key}
                        defaultValue={
                          formData[section as "auth" | "worldserver"][key]
                        }
                        className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
                      />
                    </div>
                  )
                )}
              </div>
            )}

            {/* Botón de Guardado */}
            {openSection === section && (
              <button
                type="button"
                className="w-full bg-green-500 text-white px-4 py-3 mt-4 rounded-xl hover:bg-green-600 transition-all font-semibold text-lg shadow-lg"
              >
                Guardar {section.toUpperCase()}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsServer;
