"use strict";

let soundpath = "sfx/";

let DUSound = {};
DUSound["sfx_walk_right"] = "sfx/sfx1.ogg";
DUSound["sfx_walk_left"] = "sfx/sfx1.ogg";
DUSound["sfx_walk_water_right"] = "sfx/sfx1_1.ogg";
DUSound["sfx_walk_water_left"] = "sfx/sfx1_1.ogg";
DUSound["sfx_walk_blocked"] = "sfx/sfx6.ogg";
DUSound["sfx_open_door"] = "sfx/sfx3.ogg";
DUSound["sfx_close_door"] = "sfx/sfx4.ogg";
DUSound["sfx_locked_door"] = "sfx/sfx5.ogg";
DUSound["sfx_spell_light"] = "sfx/sfx2.ogg";
DUSound["sfx_unlock"] = "sfx/sfx_open_lock.mp3";  // REPLACED: Medieval Fantasy SFX Pack / Misc / Open Lock
DUSound["sfx_potion"] = "sfx/sfx8.ogg";
DUSound["sfx_melee_miss"] = "sfx/sfx9.ogg";
DUSound["sfx_melee_hit"] = "sfx/sfx10.ogg";
DUSound["sfx_missile_miss"] = "sfx/sfx11.ogg";
DUSound["sfx_missile_hit"] = "sfx/sfx12.ogg";
DUSound["sfx_stone_drag"] = "sfx/sfx13.ogg";

// new sounds
DUSound["sfx_walk_grass_left"] = "sfx/sfx_walk_grass.mp3";   // Sanctamonia footstep_vegetation1_2
DUSound["sfx_walk_grass_right"] = "sfx/sfx_walk_grass.mp3";
DUSound["sfx_walk_ug_grass_left"] = "sfx/sfx_ug_walk_grass.mp3";   // Dungeon SFX Pack / Step 3 (sand)
DUSound["sfx_walk_ug_grass_right"] = "sfx/sfx_ug_walk_grass.mp3";
DUSound["sfx_walk_hill_left"] = "sfx/sfx_walk_hill.mp3";   // Medieval Fantasy SFX Pack / Steps / Step 2
DUSound["sfx_walk_hill_right"] = "sfx/sfx_walk_hill.mp3";
DUSound["sfx_walk_ug_hill_left"] = "sfx/sfx_ug_walk_grass.mp3";   // Dungeon SFX Pack / Misc / Step 3 (sand)
DUSound["sfx_walk_ug_hill_right"] = "sfx/sfx_ug_walk_grass.mp3";
DUSound["sfx_walk_water_left"] = "sfx/sfx_walk_water.mp3";   // Medieval Fantasy SFX Pack / Steps / Step (water) 1
DUSound["sfx_walk_water_right"] = "sfx/sfx_walk_water.mp3";
DUSound["sfx_walk_ug_water_left"] = "sfx/sfx_ug_walk_water.mp3";   // Dungeon SFX Pack / Misc / Step 5 (water)
DUSound["sfx_walk_ug_water_right"] = "sfx/sfx_ug_walk_water.mp3";
DUSound["sfx_walk_forest_left"] = "sfx/sfx_walk_forest.mp3";   // Medieval Fantasy 2 SFX Pack / Steps / StepsLeaves1
DUSound["sfx_walk_forest_right"] = "sfx/sfx_walk_forest.mp3";
DUSound["sfx_walk_ug_forest_left"] = "sfx/sfx_ug_walk_grass.mp3";   // Dungeon SFX Pack / Misc / Step 3 (sand)
DUSound["sfx_walk_ug_forest_right"] = "sfx/sfx_ug_walk_grass.mp3";
DUSound["sfx_walk_stone_left"] = "sfx/sfx_walk_stone.mp3";   // Medieval Fantasy Pack / Steps / Step (stone) 2
DUSound["sfx_walk_stone_right"] = "sfx/sfx_walk_stone.mp3";
DUSound["sfx_walk_ug_stone_left"] = "sfx/sfx_ug_walk_stone.mp3";   // Medieval Fantasy Pack / Steps / Step (stone) 2
DUSound["sfx_walk_ug_stone_right"] = "sfx/sfx_ug_walk_stone.mp3";
DUSound["sfx_walk_swamp_left"] = "sfx/sfx_walk_swamp.mp3";   // Medieval Fantasy 2 SFX Pack / Steps / StepWet1
DUSound["sfx_walk_swamp_right"] = "sfx/sfx_walk_swamp.mp3";
DUSound["sfx_walk_ug_swamp_left"] = "sfx/sfx_ug_walk_swamp.mp3";   // Dungeon SFX Pack / Misc / Step 14 (flood)
DUSound["sfx_walk_ug_swamp_right"] = "sfx/sfx_ug_walk_swamp.mp3";
DUSound["sfx_fountain_splash"] = "sfx/sfx_fountain_splash.mp3"; // Soniss 2015/Soundopolis - Water 01/Water_Fountain_Fienup_002.wav
DUSound["sfx_ocean_waves"] = "sfx/sfx_ocean_waves.mp3"; // Soniss 2015/Soundopolis - Water Ambiences 01/Beach_Ocean_Waves_Fienup_001.wav
DUSound["sfx_bubbling_lava"] = "sfx/sfx_bubbling_lava.mp3"; // RPG Sound Effects Bundle v1/Bubbling Lava.wav
DUSound["sfx_fire_crackle"] = "sfx/sfx_fire_crackle.mp3"; // Dungeon SFX Pack v1/Misc/Torch 2 (loop).mp3
DUSound["sfx_waterfall"] = "sfx/sfx_waterfall.mp3"; // Soniss 2015/Sound Ex Machine - Water Flow/Small waterfall (closer perspective) 02.wav
DUSound["sfx_waterfall_fall"] = "sfx/sfx_waterfall_fall.mp3"; // Soniss 2015/Soundopolis - Water 01/Splash_Dive_Fienup_002.wav
DUSound["sfx_default_hit"] = "sfx/sfx_Impact4.mp3"; // Medieval Fantasy 2 SFX Pack/Weapons/Impact4
DUSound["sfx_sling"] = "sfx/sfx_sling.mp3"; // Medieval Fantasy 2 SFX Pack/Weapons/Stick1
DUSound["sfx_bow"] = "sfx/sfx_bow.mp3"; // Medieval Fantasy 2 SFX Pack/Weapons/BowShot2
DUSound["sfx_magic_axe"] = "sfx/Electric 1.mp3"; // Magic Spells SFX Bundle 1/Stereo/Electric/Electric 1
DUSound["sfx_wand"] = "sfx/Generic Spell (summon) 3.ogg"; // Magic Spells SFX Bundle 1/Stereo/Generic/Generic Spell (Summon) 3
DUSound["sfx_coin"] = "sfx/Coin 2.mp3"; // Medieval Fantasy Pack/Coins and Inventory/Coin 2
DUSound["sfx_click"] = "sfx/Button04.mp3"; // Medieval Fantasy 2 SFX Pack/Misc/Button04
DUSound["sfx_small_lever"] = "sfx/Lever 2.mp3"; // Dungeon SFX Pack/Misc/Lever 2
DUSound["sfx_large_lever"] = "sfx/Lever 1.mp3"; // Dungeon SFX Pack/Misc/Lever 1
DUSound["sfx_small_zap"] = "sfx/Spell - Electric Shock 2.mp3"; // Medieval Fantasy SFX Pack/Spells/Electric Shock 2
DUSound["sfx_paper"] = "sfx/Book Page 1.mp3"; // MFSFP/Inventory/Book Page 1
DUSound["sfx_acid"] = "sfx/sfx_Water5.mp3"; // Magic Spells SFX Bundle Stereo/Water
DUSound["sfx_spell_fail"] = "sfx/sfx_Spell Fail 3.mp3"; // Magic Spells SFX Bundle Stereo Misc/Spell Fail 3
DUSound["sfx_explosion"] = "sfx/sfx_Explosion 1.wav"; // RPG SFX Bundle v1 /Explosion 1
DUSound["sfx_mind"] = "sfx/sfx_Fear 7.mp3"; // MS SFX B Stereo/Fear/Fear 7
DUSound["sfx_break_glass"] = "sfx/sfx_breakglass.wav"; // Soniss 2015 Soundopolis/Glass Smash Full/Glass_Break_ChampagneBottle_D50_Fienup_003
DUSound["sfx_chest_open"] = "sfx/sfx_ChestOpen2.mp3"; // MF2SFXP Misc/ChestOpen2.mp3
DUSound["sfx_fence_open"] = "sfx/sfx_fence_open.wav";
DUSound["sfx_fence_close"] = "sfx/sfx_fence_close.wav"; // both clipped from Soniss 2017 7o9 Russel Gorsky - Squeaks and Creaks Two/136 Wood Door 03 Creaks 01 D100 XY
DUSound["sfx_portcullis_open"] = "sfx/Portcullis Sliding Door SFX 2 (Opening).mp3";
DUSound["sfx_portcullis_close"] = "sfx/Portcullis Sliding Door SFX 2 (Closing).mp3"; // licenced from Audio Jungle from imperatorim
DUSound["sfx_crystal_trap"] = "sfx/Nature (trap).mp3"; // MS SFX B Stereo/Nature/Nature (trap)
DUSound["sfx_fire_hit"] = "sfx/Fire 4.mp3"; // NS SFX B Stereo/Fire/Fire 4
DUSound["sfx_fire_miss"] = "sfx/Spell - Fireball 1.mp3"; // MFSFXP Spell-Fireball 1
DUSound["sfx_bong"] = "sfx/sfx_bong.wav";
DUSound["sfx_teleport_pad"] = "sfx/sfx_teleport_pad.wav"; // Soniss 2015/Alexander Kopeikin - Transitions HD/transition t04 soft 016
DUSound["sfx_portal_ambient"] = "sfx/sfx_portal_ambient.wav"; // Soniss 2015/SoundMorph - Doom Drones/amb_doomdrones_digital_spaces.wav

// Magic spell sounds
DUSound["sfx_spellcast"] = "sfx/Enchantment 2.wav"; // RPGSEB Enchantment 2
DUSound["sfx_ding"] = "sfx/sfx_ding.wav"; // Magic Sounds/Chord/MS chord_triple_shigh Book of Spells.wav
DUSound["sfx_earthquake"] = "sfx/CaveCollapse.ogg"; // Dungeon SFX Pack/Misc/Cave Collapse
DUSound["sfx_whoosh"] = "sfx/sfx_air.mp3"; // Medieval Fantasy SFX Pack/Spells/Air 1
DUSound["sfx_heal"] = "sfx/Spell - Heal 2.mp3"; // MFSFP/Spells/Heal 2
DUSound["sfx_buff"] = "sfx/Event 17.mp3"; // MFSFP/Stingers/Event 17
DUSound["sfx_dangerous_buff"] = "sfx/Heal 8.mp3"; // MS SFX B/Stereo/Heal/Heal 8
DUSound["sfx_teleport"] = "sfx/sfx_teleport.mp3"; // MS SFX B/Stereo/Generic/Generic Spell (end) 2

let musicpath = "music/";
let DUMusic = {};
DUMusic["Theme"] = "Hero Victorious";
DUMusic["Dark Unknown"] = "The Dark Unknown";
DUMusic["Towne"] = "Towne";
DUMusic["Dark Towne"] = "Dark Towne";
DUMusic["Dungeon"] = "Dungeon";  
DUMusic["Dark Dungeon"] = "Dark Dungeon";  
DUMusic["Mainland"] = "Ellusus Dawn"; 
DUMusic["Village"] = "Plains of Tethlokel";
DUMusic["Island"] = "Distant Shores";
DUMusic["Magic"] = "Magic and Mystery";
DUMusic["Cave"] = "Paths Unmapped";
DUMusic["Underworld"] = "In the Underworld";  
DUMusic["Combat"] = "On the Battlefield";
DUMusic["Olympus"] = "Olympus";
DUMusic["Tension"] = "Tension";
DUMusic["Charcreate"] = "The Journey Begins";
DUMusic["Fanfare"] = "Triumph"; 
DUMusic["Ruins"] = "Among the Ruins";
DUMusic["Ether"] = "The Beyond";
DUMusic["Lullaby"] = "Lullaby";
DUMusic["Lament"] = "Shelaria's Lament";
DUMusic["Sirius"] = "This Bardic Life";
DUMusic["Death"] = "Death";
DUMusic["Final"] = "Final Steps";
DUMusic["Heartbeat"] = "Alone in the Darkness";
DUMusic["Despair"] = "Depths of Despair";
DUMusic["Alone"] = "You Are Not Alone";
DUMusic["Light"] = "A Light in the Darkness";
DUMusic["Waltz"] = "Morganna's Waltz";
DUMusic["Abyss"] = "The Great Abyss";

let musicsloaded = 0;
let soundsloaded = 0;
let musicpreload = [];

function GetMusicPath(song) {
  let fullpath = musicpath + "" + DUMusic[song] + ".ogg";
  return fullpath;
} 

function GetSfxPath(sound) {
  let fullpath = DUSound[sound];
  return fullpath;
}

function audio_init() {
  musicpreload["Dark Unknown"] = new Audio(GetMusicPath("Dark Unknown"));
  musicpreload["Dark Unknown"].oncanplaythrough = function() { handleFileLoad(); }
  if (musicpreload["Dark Unknown"].readystate === 4) { handleFileLoad(); }
}

function handleFileLoad(event) {
  if (!musicsloaded) { page_pre_zero(); }
  musicsloaded++;
}

function audio_init_2() {
  createjs.Sound.addEventListener("fileload", handleFileLoadSfx);
  for (let idx in DUSound) {    
    createjs.Sound.registerSound(DUSound[idx], idx);
  }
}

// checks to see if the player has turned off sound
function DUPlaySound(sound) {
  let playing = {};
  if (DU.gameflags.getFlag("sound")) { 
//    playing.song = createjs.Sound.play(sound); 
    playing.song = new Audio(GetSfxPath(sound));
    playing.name = sound; 
    playing.song.volume = DU.gameflags.getFlag("sound");
    playing.song.play();
  }
  return playing;
}

function DUPlayMusic(sound) {
  let playing = {};
  if (DU.gameflags.getFlag("music")) { 
    StopMusic();
    let loopval = 0;
    if (DU.gameflags.getFlag("loopmusic")) { loopval = true; }
    playing.song = new Audio(GetMusicPath(sound)); 
    playing.name = sound; 
    playing.song.loop = loopval;
    playing.song.volume = DU.gameflags.getFlag("music");
    playing.song.play();
  }
  return playing;
}

function DUPlayAmbient(sound) {
  let playing = {};
  if (DU.gameflags.getFlag("ambientsound") && DU.gameflags.getFlag("sound")) { 
//    playing.song = createjs.Sound.play(sound, {loop:-1}); 
    playing.song = new Audio(GetSfxPath(sound));
    playing.song.loop = true;
    playing.song.play()
    playing.name = sound; 
    playing.song.volume = 0;
    setTimeout(function() { IncAmbientVol(playing); }, 500);
  }

  return playing;
}

function IncAmbientVol(playing) {
  if (playing.name === ambient.name) {
    if (playing.song.volume < DU.gameflags.getFlag("sound")) {
      playing.song.volume = Math.min(playing.song.volume + .125, DU.gameflags.getFlag("sound"));
      setTimeout(function() { IncAmbientVol(playing); }, 250);
    }
  }
}

function DecAmbientVol(playing) {
  if (playing.song.volume > 0) {
    playing.song.volume -= .125;
    setTimeout(function() { DecAmbientVol(playing); }, 150);
  } else {
    playing.song.pause();
  }
}


function StopMusic(playing) {
  if (!playing) { playing = nowplaying; }
  if (playing.song) {
    playing.song.pause();
  }
  nowplaying = {};
}

function play_footstep(onwhat) {
  if (laststep === "left") {
    DUPlaySound(onwhat + "_right");
    laststep = "right";
  } else {
    DUPlaySound(onwhat + "_left");
    laststep = "left";
  }
}

function handleFileLoadSfx(event) {
  // A sound has been preloaded.
  let numsounds = Object.keys(DUSound).length;
  soundsloaded++;
  if (soundsloaded === numsounds) {
    SoundLoaded();
  }
}

function QueueMusic(songname) {
  nowplaying.song.loop = 0;
  nowplaying.song.addEventListener("complete", function(event) {
    nowplaying = DUPlayMusic(songname);
  });
}